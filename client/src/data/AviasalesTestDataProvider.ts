import { Ticket } from "../models/Ticket";
import { DataProviderBase } from "./DataProviderBase";

async function fetchNext(searchId: string): Promise<any> {
    let response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);

    if (response.status === 502 || response.status === 500) {
        console.log("Correctable error: ", await response.text());
        // Server error or timeout
        return await fetchNext(searchId);
    } else if (response.status != 200) {
        throw new Error(response.statusText);
    } else {        
        const res = await response.json();     
        return res;        
    }    
}

export class AviasalesTestDataProvider extends DataProviderBase {


    getTickets = async (onNextDataPortion: (ticketPortion: Ticket[]) => void) => {
        let response = await fetch(`https://front-test.beta.aviasales.ru/search`);
        if (response.status != 200) {
            console.log("Error: ", response.statusText);
            throw new Error(response.statusText);
        }
        const newSearch = await response.json();
        let stop = false;
        while(!stop) {
            const response = await fetchNext(newSearch.searchId);            
            stop = response.stop;
            if (response.tickets && response.tickets.length > 0) {                
                onNextDataPortion(response.tickets);
                await new Promise(r => setTimeout(r, 500)); // JFT
            }
        } 
    }

    getCarrierImageUrl = (carrierCode: string) => {
        return `//pics.avs.io/99/36/${carrierCode}.png`;
    }
}