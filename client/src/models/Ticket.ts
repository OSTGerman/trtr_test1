import { Company } from "./Company";
import { Segment } from "./Segment";

export interface Ticket {
    id: string;
    // Цена в рублях
    price: number;
    // Массив идентификаторов перелётов
    segments: Segment[];    
    carrier: string;

    company: Company;
}