import { Segment } from "../models/Segment";

function padZero(num: number, targetLength: number) {
    return String(num).padStart(targetLength, '0')
}

const options: Intl.DateTimeFormatOptions = {    
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  };

export function getSegmentStartStopStr(segment: Segment): string {
    const startDate = new Date(segment.date);
    const endDate = new Date(startDate.getTime() + segment.duration * 60000);
    return `${startDate.toLocaleTimeString('ru-RU', options)} – ${endDate.toLocaleTimeString('ru-RU', options)}`    
}

export function getDurationStr(segment: Segment): string {    
    return `${padZero(Math.floor(segment.duration / 60), 2)}ч ${padZero(segment.duration % 60, 2)}м`;
}