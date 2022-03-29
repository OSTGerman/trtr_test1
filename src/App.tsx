import React, { useState, useEffect } from 'react';
import { Logo } from './components/logo/Logo'
import './App.scss'
import { TransferFilter } from './components/transfer-filter/TransferFilter';
import { CompanyFilter } from './components/company-filter/CompanyFilter';
import { TicketsRibbon } from './components/tickets-ribbon/TicketsRibbon';
import { PaginationButton } from './components/pagination-button/PaginationButton';
import { AviasalesTestDataProvider } from './data/AviasalesTestDataProvider';
import { Ticket as TicketModel } from './models/Ticket';
import { DataStore } from './data/DataStore';
import { Company } from './models/Company';
import { QualityFilter } from './components/quality-filter/QualityFilter';
import { QualityFilterValues } from './models/QualityFilterValues';

const TICKET_PAGE_SIZE = 5;

function App() {

  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedTransfers, setSelectedTransfers] = useState([true, true, false, false]);
  const [quality, setQuality] = useState<QualityFilterValues>('CHEAPEST');
  const [dataStore] = useState<DataStore>(new DataStore(new AviasalesTestDataProvider()));
  const [updateCount, setUpdateCount] = useState(0);
  const [currentTicketCount, setCurrentTicketCount] = useState(0);
  const [ticketsLeft, setTicketsLeft] = useState(0);

  useEffect(() => {
    dataStore.fetchData(() => {
      setCompanies(dataStore.GetCompanies());
      setUpdateCount(updateCount => updateCount + 1);
    });
  }, [dataStore]);

  const updateTickets = (loadNew: boolean) => {
    if (loadNew) {
      setTickets([]);
    }
    const ticketsModel = dataStore.GetFilteredData(selectedTransfers, companyId, quality, loadNew ? 0 : currentTicketCount, TICKET_PAGE_SIZE);
    setCurrentTicketCount(ticketsModel.pageStart + ticketsModel.pageCount);
    setTicketsLeft(ticketsModel.totalCount - ticketsModel.pageStart + ticketsModel.pageCount);
    setTickets(tickets => [...tickets, ...ticketsModel.tickets]);
  }

  useEffect(() => {
    updateTickets(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStore, companyId, companies, selectedTransfers, quality, updateCount]);


  return (
    <div className='app'>
      <div className='app-header'>
        <Logo />
      </div>
      {/* <div>Tickets count: {currentTicketCount}</div>
      <div>Tickets left: {ticketsLeft}</div> */}
      <div className='app-container'>
        <div className='filters-left-container'>
          <TransferFilter possibleTransfers={selectedTransfers} onTransfersChanged={transfers => { setSelectedTransfers([...transfers]); }}></TransferFilter>
          <CompanyFilter companies={companies} onCompanySelected={companyId => { setCompanyId(companyId); }}></CompanyFilter>
        </div>
        <div className='main-container'>
          <QualityFilter initialQuality='CHEAPEST' onFilterChanged={(quality) => { setQuality(quality); }}></QualityFilter>
          {
            updateCount ?
              <div>
                <TicketsRibbon tickets={tickets}></TicketsRibbon>
                {
                  ticketsLeft > 0 &&
                  <PaginationButton pageSize={TICKET_PAGE_SIZE} ticketsLeft={ticketsLeft} onClick={() => {
                    updateTickets(false);
                  }}></PaginationButton>
                }
              </div>
              :
              <div>Загрузка данных...</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
