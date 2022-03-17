import React, { useState, useEffect } from 'react';
import { Logo }   from './components/logo/Logo'
import './App.scss'
import { TransferFilter } from './components/transfer-filter/TransferFilter';
import { CompanyFilter } from './components/company-filter/CompanyFilter';
import { TicketsRibbon } from './components/tickets-ribbon/TicketsRibbon';
import { getTickets } from './data/DataProvider';
import { Ticket as TicketModel } from './models/Ticket';

function App() {

  const [data, setData] = useState({ tickets: new Array<TicketModel[]>() });

  useEffect(() => {
    const fetchData = async () => {
      const tickets = await getTickets();
      setData({tickets: tickets});      
      alert(tickets);
    }    
    fetchData();
  }, []);

  return (
    <div className='app'>      
      <div className='app-header'>
        <Logo/>                
      </div>        
      <div className='app-container'>
        <div className='filters-left-container'>
          <TransferFilter></TransferFilter>
          <div style={{height: "20px" /* TODO! this is ugly */}}></div>
          <CompanyFilter></CompanyFilter>
        </div>
        <div className='main-container'>
          <TicketsRibbon tickets={data.tickets}></TicketsRibbon>
        </div>
      </div>
    </div>
  );
}

export default App;
