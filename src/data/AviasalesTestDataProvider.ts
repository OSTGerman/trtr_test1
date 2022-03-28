import { Ticket } from "../models/Ticket";
import { DataProviderBase } from "./DataProviderBase";

const MAX_RETRY_COUNT: number = 10;

export class AviasalesTestDataProvider extends DataProviderBase {

    private _retries: number = 0;

    async fetchNext(searchId: string): Promise<any> {
        let response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    
        if (response.status === 502 || response.status === 500) {
            console.log("Correctable error: ", await response.text());
            // Server error or timeout            
            if (this._retries >= MAX_RETRY_COUNT) {
                console.log(`Giving up after ${this._retries} retries`)
                return {stop: true};
            }            
            this._retries++;
            return await this.fetchNext(searchId);
        } else if (response.status !== 200) {
            throw new Error(response.statusText);
        } else {        
            
            const res = await response.json();     
            return res;        
        }    
    }
    
    getTickets = async (onNextDataPortion: (ticketPortion: Ticket[]) => void) => {
        let response = await fetch(`https://front-test.beta.aviasales.ru/search`);
        if (response.status !== 200) {
            console.log("Error: ", response.statusText);
            throw new Error(response.statusText);
        }
        const newSearch = await response.json();
        let stop = false;
        while(!stop) {
            this._retries = 0;
            const response = await this.fetchNext(newSearch.searchId);            
            stop = response.stop;
            if (response.tickets && response.tickets.length > 0) {                
                onNextDataPortion(response.tickets);
                //await new Promise(r => setTimeout(r, 500)); // JFT
            }
        } 
    }

    getCarrierImageUrl = (carrierCode: string) => {
        return `//pics.avs.io/99/36/${carrierCode}.png`;
    }
}