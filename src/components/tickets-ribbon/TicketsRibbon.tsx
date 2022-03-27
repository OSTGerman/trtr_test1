import React from 'react';
import './TicketsRibbon.scss';
import { Ticket as TicketModel } from '../../models/Ticket';
import { Ticket } from '../ticket/Ticket';


export function TicketsRibbon({ tickets }: { tickets: TicketModel[] }) {

    return (        
        <div className='tickets-ribbon-container'>            
            {                
                tickets && tickets.map(ticket =>                                       
                        <Ticket key={ticket.id} ticket={ticket}></Ticket>                    
                )
            }
        </div>        
    );
}