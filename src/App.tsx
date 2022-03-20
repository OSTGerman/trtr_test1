import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Logo } from './components/logo/Logo'
import './App.scss'
import { TransferFilter } from './components/transfer-filter/TransferFilter';
import { CompanyFilter } from './components/company-filter/CompanyFilter';
import { TicketsRibbon } from './components/tickets-ribbon/TicketsRibbon';
import { AviasalesTestDataProvider } from './data/AviasalesTestDataProvider';
import { Ticket as TicketModel } from './models/Ticket';
import { DataStore } from './data/DataStore';
import { Company } from './models/Company';
import { QualityFilter } from './components/quality-filter/QualityFilter';
import { QualityFilterValues } from './models/QualityFilterValues';

let dataStore: DataStore;

function App() {

  const [tickets, setTickets] = useState(new Array<TicketModel>());
  const [companies, setCompanies] = useState(new Array<Company>());
  const [companyId, setCompanyId] = useState<string|null>(null);
  const [selectedTransfers, setSelectedTransfers] = useState([true, true, false, false]);
  const [quality, setQuality] = useState<QualityFilterValues>('CHEAPEST');


  useEffect(() => {
    if (!dataStore) {
      dataStore = new DataStore(new AviasalesTestDataProvider(), () => {        
        setCompanies(dataStore.GetCompanies());        
      })
    }        
    setTickets(dataStore.GetFilteredData(selectedTransfers, companyId, quality));
  }, [companyId, companies, selectedTransfers, quality]);

  return (
    <div className='app'>
      <div className='app-header'>
        <Logo />
      </div>
      <div className='app-container'>
        <div className='filters-left-container'>
          <TransferFilter possibleTransfers={selectedTransfers} onTransfersChanged={transfers => { setSelectedTransfers(Array.from(transfers));}}></TransferFilter>          
          <CompanyFilter companies={companies} onCompanySelected={companyId => {setCompanyId(companyId);}}></CompanyFilter>
        </div>
        <div className='main-container'>
          <QualityFilter initialQuality='CHEAPEST' onFilterChanged={(quality) => {setQuality(quality);}}></QualityFilter>
          <TicketsRibbon tickets={tickets}></TicketsRibbon>
        </div>
      </div>
    </div>
  );
}

export default App;
