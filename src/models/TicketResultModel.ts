import { Ticket } from "./Ticket";

export interface TicketResultModel {
    tickets: Ticket[];
    pageStart: number;
    pageCount: number;
    totalCount: number;
}