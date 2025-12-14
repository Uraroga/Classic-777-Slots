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
    { label: '3 x', symbol: SymbolType.SEVEN, payout: 100 },
    { label: '3 x', symbol: SymbolType.BAR, payout: 40 },
    { label: '3 x', symbol: SymbolType.BELL, payout: 20 },
    { label: '3 x', symbol: SymbolType.CHERRY, payout: 10 },
    { label: '2 x', symbol: SymbolType.CHERRY, payout: 2, sub: t.any },
    { label: '1 x', symbol: SymbolType.CHERRY, payout: 1, sub: t.any },
  ];

  return (
    <div className="bg-slate-800 p-4 rounded-lg border-2 border-slate-600 shadow-xl max-w-sm w-full">
      <h3 className="text-yellow-400 font-display text-center text-lg mb-3 tracking-widest uppercase border-b border-slate-600 pb-2">
        {t.payTable}
      </h3>
      <div className="space-y-2">
        {rows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 w-8 text-right font-bold">{row.label}</span>
              <div className="scale-75 origin-left">
                <SymbolDisplay type={row.symbol} size="sm" lang={lang} />
              </div>
              {row.sub && <span className="text-xs text-slate-500 italic">{row.sub}</span>}
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 font-bold font-mono text-lg">{row.payout}</span>
              <span className="text-slate-500 ml-1 text-xs">{t.credits}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-xs text-slate-500">
        {t.paylineCenter}
      </div>
    </div>
  );
};

export default PayTable;