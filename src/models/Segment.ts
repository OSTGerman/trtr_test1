import { CityCodes } from "./CityCodes";


// список перелётов
export interface Segment {
  id: string;

  origin: CityCodes;

  destination: CityCodes;

  date: string;

  stops: CityCodes[];

  duration: number;


}