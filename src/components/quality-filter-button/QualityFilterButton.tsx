import React, { useState } from 'react';
import './QualityFilterButton.scss';

export function QualityFilterButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {    
    return (
        <div className={'quality-filter-button' + (isActive ? ' quality-filter-button__active' : '')} onClick={() => onClick()}>
            <span className='quality-filter-label'>{label}</span>            
        </div>
    );
}