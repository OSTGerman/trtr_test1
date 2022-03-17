import React from 'react';
import { Logo }   from './components/logo/Logo'
import './App.scss'
import { TransferFilter } from './components/transfer-filter/TransferFilter';
import { CompanyFilter } from './components/company-filter/CompanyFilter';

function App() {
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
        <div className='main-container'></div>
      </div>
    </div>
  );
}

export default App;
