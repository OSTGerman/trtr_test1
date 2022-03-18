import React, { useState, useEffect } from 'react';
import { Logo } from './components/logo/Logo'
import './App.scss'
import { TransferFilter } from './components/transfer-filter/TransferFilter';
import { CompanyFilter } from './components/company-filter/CompanyFilter';
import { TicketsRibbon } from './components/tickets-ribbon/TicketsRibbon';
import { AviasalesTestDataProvider } from './data/AviasalesTestDataProvider';
import { Ticket as TicketModel } from './models/Ticket';
import { DataStore } from './data/DataStore';

function App() {

  const [tickets, setTickets] = useState(new Array<TicketModel>());
  const [companies, setCompanies] = useState(new Array<string>());

  var dataStore: DataStore;

  useEffect(() => {
    dataStore = new DataStore(new AviasalesTestDataProvider(), () => {
      setCompanies(dataStore.GetCompanies());
      setTickets(dataStore.GetFilteredData([], null));      
    });
  }, []);

  return (
    <div className='app'>
      <div className='app-header'>
        <Logo />
      </div>
      <div className='app-container'>
        <div className='filters-left-container'>
          <TransferFilter></TransferFilter>
          <div style={{ height: "20px" /* TODO! this is ugly */ }}></div>
          <CompanyFilter companies={companies} onCompanySelected={company => setTickets(dataStore.GetFilteredData([], company))}></CompanyFilter>
        </div>
        <div className='main-container'>
          <TicketsRibbon tickets={tickets}></TicketsRibbon>
        </div>
      </div>
    </div>
  );
}

export default App;
