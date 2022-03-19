import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './components/logo/Logo'
import './App.scss'
import { TransferFilter } from './components/transfer-filter/TransferFilter';
import { CompanyFilter } from './components/company-filter/CompanyFilter';
import { TicketsRibbon } from './components/tickets-ribbon/TicketsRibbon';
import { AviasalesTestDataProvider } from './data/AviasalesTestDataProvider';
import { Ticket as TicketModel } from './models/Ticket';
import { DataStore } from './data/DataStore';
import { Company } from './models/Company';

let dataStore: DataStore;

function App() {

  const [tickets, setTickets] = useState(new Array<TicketModel>());
  const [companies, setCompanies] = useState(new Array<Company>());
  const [company, setCompany] = useState<Company|null>(null);

  const applyFilters = () => {
    setTickets(dataStore.GetFilteredData([], company));
  } 

  useEffect(() => {
    if (!dataStore) {
      dataStore = new DataStore(new AviasalesTestDataProvider(), () => {
        setCompanies(dataStore.GetCompanies());
        applyFilters();
      })
    }
    applyFilters();
  }, [company]);

  return (
    <div className='app'>
      <div className='app-header'>
        <Logo />
      </div>
      <div className='app-container'>
        <div className='filters-left-container'>
          <TransferFilter></TransferFilter>
          <div style={{ height: "20px" /* TODO! this is ugly */ }}></div>
          <CompanyFilter companies={companies} onCompanySelected={company => {setCompany(company);}}></CompanyFilter>
        </div>
        <div className='main-container'>
          <TicketsRibbon tickets={tickets}></TicketsRibbon>
        </div>
      </div>
    </div>
  );
}

export default App;
