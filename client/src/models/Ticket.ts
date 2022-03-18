import { Segment } from "./Segment";

export interface Ticket {
    id: string;
    // Цена в рублях
    price: number;
    // идентификатор компании которая осуществляет перевозку
    companyId: string;
    // Массив идентификаторов перелётов
    segments: Segment[];
    
    carrier: string;
}