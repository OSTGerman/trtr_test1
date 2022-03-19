import React, { useState } from 'react';
import './Ticket.scss';
import { Ticket as TicketModel } from '../../models/Ticket';


export function Ticket({ticket}: {ticket: TicketModel}) {

    return (
        <div className='ticket-container'>
            <div className='ticket-header'>
                <span className='ticket-price'>{ticket.price} Р</span>
                <span className='ticket-price'>{ticket.carrier} Р</span>
                <img className='ticket-company-img'></img>
            </div>
            <div className='ticket-segments-container'>
                {
                    ticket.segments && ticket.segments.map(segment =>
                        <div className='ticket-segment-container'>
                            <div className='ticket-segment-column'>
                                <span className='ticket-segment-caption'>{segment.origin} — {segment.destination}</span>
                                <span className='ticket-segment-value'>{segment.dateStart} — {segment.dateEnd}</span>
                            </div>
                            <div className='ticket-segment-column'>
                                <span className='ticket-segment-caption'>В пути</span>
                                <span className='ticket-segment-value'>{segment.duration}</span>
                            </div>
                            <div className='ticket-segment-column'>
                                <span className='ticket-segment-caption'>{segment.stops.length}</span>
                                <span className='ticket-segment-value'>{segment.stops.join(', ')}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}