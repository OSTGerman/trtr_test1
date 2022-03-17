import { CityCodes } from "./CityCodes";

// список перелётов
export interface Segment {
    id: string;
    // Код города откуда вылет
    origin: CityCodes;
    // Код города куда летим
    destination: CityCodes;
    // Дата и время вылета в unix времени
    dateStart: string;
    // Дата и время прибытия в unix времени
    dateEnd: string;
    // Массив кодов городов с пересадками
    stops: CityCodes[];
    // Длительность полета в миллисекундах
    duration: number;
  }