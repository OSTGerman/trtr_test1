import React, { useState, useEffect } from 'react';
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

function App() {

  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedTransfers, setSelectedTransfers] = useState([true, true, false, false]);
  const [quality, setQuality] = useState<QualityFilterValues>('CHEAPEST');
  const [dataStore] = useState<DataStore>(new DataStore(new AviasalesTestDataProvider()));
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    dataStore.fetchData(() => {
      setCompanies(dataStore.GetCompanies());
      setUpdateCount(updateCount => updateCount + 1);
    });
  }, [dataStore]);

  useEffect(() => {
    setTickets(dataStore.GetFilteredData(selectedTransfers, companyId, quality));
  }, [dataStore, companyId, companies, selectedTransfers, quality, updateCount]);

  return (
    <div className='app'>
      <div className='app-header'>
        <Logo />
      </div>
      <div className='app-container'>
        <div className='filters-left-container'>
          <TransferFilter possibleTransfers={selectedTransfers} onTransfersChanged={transfers => { setSelectedTransfers([...transfers]); }}></TransferFilter>
          <CompanyFilter companies={companies} onCompanySelected={companyId => { setCompanyId(companyId); }}></CompanyFilter>
        </div>
        <div className='main-container'>
          <QualityFilter initialQuality='CHEAPEST' onFilterChanged={(quality) => { setQuality(quality); }}></QualityFilter>
          {
            updateCount ?
              <TicketsRibbon tickets={tickets}></TicketsRibbon>
              :
              <div>Загрузка данных...</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
