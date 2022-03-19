import { Company } from "../models/Company";
import { Ticket } from "../models/Ticket";
import { IDataProvider } from "./IDataProvider";
import { v4 as uuid } from 'uuid';

export class DataStore {

    constructor(provider: IDataProvider, onNewDataAvailable: () => void) {
        this.provider = provider;
        this.onNewDataAvailable = onNewDataAvailable;
        provider.getTickets(ticketPortion => {
            this.data = this.data.concat(ticketPortion);
            ticketPortion.forEach(ticket => {
                if (!this.companies.has(ticket.carrier)) {
                    this.companies.set(ticket.carrier, {
                        id: uuid(),
                        name: ticket.carrier
                    });
                }
                const comp = this.companies.get(ticket.carrier);
                if (comp) {
                    ticket.company = comp;
                }
                ticket.id = uuid();
            });
            onNewDataAvailable && onNewDataAvailable();
        });
    }

    private data: Ticket[] = [];
    private companies: Map<string, Company> = new Map<string, Company>();
    private provider: IDataProvider;
    private onNewDataAvailable: () => void;

    public GetFilteredData(transfers: number[], company: Company | null): Ticket[] {
        const res = this.data.filter((ticket) => {
            return !company || ticket.company.id === company.id;
        });
        return res.slice(0, 5);
    }

    public GetCompanies(): Company[] {
        return Array.from(this.companies.values());
    }


}
