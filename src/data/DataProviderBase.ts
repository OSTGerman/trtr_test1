import { Ticket } from "../models/Ticket";

export abstract class DataProviderBase {
    abstract getTickets: (onNextDataPortion: (ticketPortion: Ticket[]) => void) => void;

    abstract getCarrierImageUrl: (carrierCode: string) => string;
}