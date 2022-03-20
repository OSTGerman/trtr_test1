import React, { useState } from 'react';
import { FilterCheckbox } from '../filter-checkbox/FilterCheckBox';
import './TransferFilter.scss'
export function TransferFilter({ possibleTransfers, onTransfersChanged }: { possibleTransfers: boolean[], onTransfersChanged: (transfers: boolean[]) => void }) {


    const getTransfersLabel = (stopsCount: number): string => {
        if (stopsCount === 0) {
            return "Без пересадок";
        }
        const suffix = stopsCount === 1 ? "а" : "и";
        return `${stopsCount} пересадк${suffix}`;
    }

    const [transfers, setTransfers] = useState(possibleTransfers);

    return (
        <div className='transfer-filter-container'>
            <span className='transfer-filter-caption'>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
            {
                possibleTransfers.map((transfer, idx) =>
                    <FilterCheckbox key={idx} label={getTransfersLabel(idx)} value={transfer} onChange={(a) => {                                                
                        setTransfers(transfers => {
                            transfers[idx] = a;
                            return transfers;
                        });
                        onTransfersChanged(transfers);
                    }} />
                )
            }
        </div>
    );
}