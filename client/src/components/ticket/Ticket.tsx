import React, { useState } from 'react';
import './Ticket.scss';
import { Ticket as TicketModel } from '../../models/Ticket';
import { getDurationStr, getSegmentStartStopStr } from '../../util/formatting_utils';


export function Ticket({ticket}: {ticket: TicketModel}) {

    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',       
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0
      });

    const getStopsLabel = (stopsCount: number): string => {
        if (stopsCount === 0) {
            return "прямой";
        }
        const suffix = stopsCount === 1 ? "а" : "и";
        return `${stopsCount} пересадк${suffix}`;
    }

    return (
        <div className='ticket-container'>
            <div className='ticket-header'>
                <span className='ticket-price'>{formatter.format(ticket.price)}</span>                
                <img className='ticket-company-img' src={ticket.company.imageUrl}></img>
            </div>
            <div className='ticket-segments-container'>
                {
                    ticket.segments && ticket.segments.map((segment, idx) =>
                        <div className='ticket-segment-container' key={idx}>
                            <div className='ticket-segment-column'>
                                <span className='ticket-segment-caption'>{segment.origin} — {segment.destination}</span>
                                <span className='ticket-segment-value'>{getSegmentStartStopStr(segment)}</span>
                            </div>
                            <div className='ticket-segment-column'>
                                <span className='ticket-segment-caption'>В пути</span>
                                <span className='ticket-segment-value'>{getDurationStr(segment)}</span>
                            </div>
                            <div className='ticket-segment-column'>
                                <span className='ticket-segment-caption'>{getStopsLabel(segment.stops.length)}</span>
                                <span className='ticket-segment-value'>{segment.stops.join(', ')}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}