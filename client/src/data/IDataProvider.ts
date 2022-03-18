import { Ticket } from "../models/Ticket";

export interface IDataProvider {
    getTickets: (onNextDataPortion: (ticketPortion: Ticket[]) => void) => void;
}