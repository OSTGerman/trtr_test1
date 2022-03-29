import React from 'react';
import './PaginationButton.scss';

export function PaginationButton({ ticketsLeft, pageSize, onClick }: { ticketsLeft: number, pageSize: number, onClick: () => void }) {
    
    return (
        <div className='pagination-button' onClick={() => onClick()}>            
            <span className='pagination-button-label'>Показать еще {pageSize} билетов</span>            
        </div>
    );
}