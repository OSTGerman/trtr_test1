import { Ticket } from "../models/Ticket";

async function fetchNext(searchId: string, currentTickets: Ticket[] = []): Promise<Ticket[]> {
    let response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);

    if (response.status === 502 || response.status === 500) {
        console.log("Correctable error: ", response.statusText);
        // Server error or timeout
        await fetchNext(searchId, currentTickets);
    } else if (response.status != 200) {
        console.log("Error: ", response.statusText);
        // Try again
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // await fetchNext(searchId);
        return [];
    } else {        
        const res = await response.json();        
        if (!res.stop) {
            await fetchNext(searchId, currentTickets.concat(res.tickets));
        }        
    }
    return currentTickets;
}

export async function getTickets() {
    let response = await fetch(`https://front-test.beta.aviasales.ru/search`);
    if (response.status != 200) {
        console.log("Error: ", response.statusText);
        throw new Error(response.statusText);
    }
    const newSearch = await response.json();
    return fetchNext(newSearch.searchId);
}