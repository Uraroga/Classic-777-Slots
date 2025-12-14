import React from 'react';
import { SymbolType, Language } from '../types';
import { Cherry, Bell } from 'lucide-react';
import { getTranslation } from '../translations';

interface SymbolDisplayProps {
  type: SymbolType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  lang?: Language;
}

const SymbolDisplay: React.FC<SymbolDisplayProps> = ({ type, className = '', size = 'md', lang = 'en' as Language }) => {
  const t = getTranslation(lang);
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-4xl',
  };

  const iconSize = size === 'lg' ? 48 : size === 'md' ? 32 : 16;

  switch (type) {
    case SymbolType.CHERRY:
      return (
        <div className={`flex flex-col items-center justify-center text-red-600 drop-shadow-sm ${className}`}>
          <Cherry size={iconSize} fill="currentColor" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-red-800 hidden sm:block">{t.labelCherry}</span>
        </div>
      );
    case SymbolType.BELL:
      return (
        <div className={`flex flex-col items-center justify-center text-yellow-500 drop-shadow-sm ${className}`}>
          <Bell size={iconSize} fill="currentColor" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-yellow-700 hidden sm:block">{t.labelBell}</span>
        </div>
      );
    case SymbolType.SEVEN:
      return (
        <div className={`flex items-center justify-center font-display font-black text-red-600 drop-shadow-md ${sizeClasses[size]} ${className}`}>
          7
        </div>
      );
    case SymbolType.BAR:
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="bg-white border-4 border-black px-3 py-1 shadow-sm">
            <span className={`font-black tracking-widest text-black ${size === 'lg' ? 'text-xl' : 'text-xs'}`}>BAR</span>
          </div>
        </div>
      );
    case SymbolType.BLANK:
    default:
      return (
        <div className={`flex items-center justify-center opacity-20 ${className}`}>
          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
        </div>
      );
  }
};

export default SymbolDisplay;