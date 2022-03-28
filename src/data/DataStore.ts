import { Company } from "../models/Company";
import { Ticket } from "../models/Ticket";
import { DataProviderBase } from "./DataProviderBase";
import { v4 as uuid } from 'uuid';
import { QualityFilterValues } from "../models/QualityFilterValues";

export class DataStore {

    private _provider: DataProviderBase;

    constructor(provider: DataProviderBase) {
        this._provider = provider;
    }
    
    fetchData(onNewDataAvailable: () => void) {
        this._provider.getTickets(ticketPortion => {
            this.data = this.data.concat(ticketPortion);
            ticketPortion.forEach(ticket => {
                if (!this.companies.has(ticket.carrier)) {
                    this.companies.set(ticket.carrier, {
                        id: uuid(),
                        name: ticket.carrier,
                        imageUrl: this._provider.getCarrierImageUrl(ticket.carrier)
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

    private getTotalDuration(ticket: Ticket) {
        return ticket.segments.reduce((duration, current) => duration + current.duration, 0);
    }

    private getTotalStops(ticket: Ticket) {
        return ticket.segments.reduce((stops, current) => stops + current.stops.length, 0);
    }

    private sortTickets(ticketA: Ticket, ticketB: Ticket, quality: QualityFilterValues)  {
        switch (quality) {
            case "CHEAPEST":
                return ticketA.price - ticketB.price;
            case "FASTEST":                
                return this.getTotalDuration(ticketA) - this.getTotalDuration(ticketB);
            case "OPTIMAL":
                const priceDiff = Math.sign(ticketA.price - ticketB.price);
                const durationDiff = Math.sign(this.getTotalDuration(ticketA) - this.getTotalDuration(ticketB));
                const stopsDiff = Math.sign(this.getTotalStops(ticketA) - this.getTotalStops(ticketB));
                return priceDiff /** 1.2*/ + durationDiff + stopsDiff /** 1.1*/;
                
            default:
                throw new Error("Unknown quality param");
        }
    }

    public GetFilteredData(transfers: boolean[], companyId: string | null, quality: QualityFilterValues): Ticket[] {        
        const res = this.data.filter((ticket) => {
            const companyOk = !companyId || ticket.company.id === companyId;
            const transfersOk = ticket.segments.every(segment => transfers[segment.stops.length]);
            return  companyOk && transfersOk;
        })
        .sort((a, b) => this.sortTickets(a, b, quality));
        return res.slice(0, 5);
    }

    public GetCompanies(): Company[] {
        return Array.from(this.companies.values());
    }


}
