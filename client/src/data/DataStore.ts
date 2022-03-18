import { Company } from "../models/Company";
import { Ticket } from "../models/Ticket";
import { IDataProvider } from "./IDataProvider";

export class DataStore {

    constructor(provider: IDataProvider, onNewDataAvailable: () => void) {
        this.provider = provider;
        this.onNewDataAvailable = onNewDataAvailable;
        provider.getTickets(ticketPortion => {
            this.data = this.data.concat(ticketPortion);
            ticketPortion.forEach(ticket => {
                if (!this.companies.includes(ticket.carrier)) {
                    this.companies.push(ticket.carrier);
                }
            });
            onNewDataAvailable && onNewDataAvailable();
        });
    }

    private data: Ticket[] = [];
    private companies: string[] = [];
    private provider: IDataProvider;
    private onNewDataAvailable: () => void;

    public GetFilteredData(transfers: number[], companyId: string | null): Ticket[] {
        return this.data.filter((ticket) => {
            return !companyId || ticket.companyId === companyId;
        });
    }

    public GetCompanies(): string[] {
        return this.companies;
    }


}
