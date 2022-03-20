import { Segment } from "../models/Segment";

function padZero(num: number, targetLength: number) {
    return String(num).padStart(targetLength, '0')
}

export function getSegmentStartStopStr(segment: Segment): string {
    const startDate = new Date(segment.date);
    const endDate = new Date(startDate.getTime() + segment.duration * 60000);
    return `${padZero(startDate.getHours(), 2)}:${padZero(startDate.getMinutes(), 2)} –
            ${padZero(endDate.getHours(), 2)}:${padZero(endDate.getMinutes(), 2)}`;
}

export function getDurationStr(segment: Segment): string {    
    return `${padZero(Math.floor(segment.duration / 60), 2)}ч ${padZero(segment.duration % 60, 2)}м`;
}