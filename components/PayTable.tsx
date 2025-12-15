import React from 'react';
import SymbolDisplay from './SymbolDisplay';
import { SymbolType, Language } from '../types';
import { getTranslation } from '../translations';

interface PayTableProps {
  lang: Language;
}

const PayTable: React.FC<PayTableProps> = ({ lang }) => {
  const t = getTranslation(lang);

  const rows = [
    { label: '3 x', symbol: SymbolType.SEVEN, payout: 1000 },
    { label: '3 x', symbol: SymbolType.BAR, payout: 200 },
    { label: '3 x', symbol: SymbolType.BELL, payout: 100 },
    { label: '3 x', symbol: SymbolType.CHERRY, payout: 50 },
    { label: '2 x', symbol: SymbolType.BELL, payout: 5 },
    { label: '1 x', symbol: SymbolType.BELL, payout: 2 },
    { label: '2 x', symbol: SymbolType.CHERRY, payout: 5 },
    { label: '1 x', symbol: SymbolType.CHERRY, payout: 2 },
  ];

  return (
    <div className="bg-slate-800 p-4 rounded-lg border-2 border-slate-600 shadow-xl max-w-sm w-full">
      <h3 className="text-yellow-400 font-display text-center text-lg mb-3 tracking-widest uppercase border-b border-slate-600 pb-2">
        {t.payTable}
      </h3>
      <div className="space-y-1">
        {rows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 w-8 text-right font-bold text-xs sm:text-sm">{row.label}</span>
              <div className="scale-75 origin-left">
                <SymbolDisplay type={row.symbol} size="sm" lang={lang} />
              </div>
            </div>
            <div className="flex items-center">
              <span className={`font-bold font-mono ${row.payout >= 50 ? 'text-yellow-400 text-lg' : 'text-slate-300 text-base'}`}>{row.payout}</span>
              <span className="text-slate-500 ml-1 text-[10px]">{t.credits}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-[10px] text-slate-500">
        {t.paylineCenter}
      </div>
    </div>
  );
};

export default PayTable;