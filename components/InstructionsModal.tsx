import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose, lang }) => {
  const t = getTranslation(lang);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-800 border-2 border-slate-600 rounded-xl shadow-2xl p-6 text-slate-200 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-display text-yellow-400 mb-4 text-center tracking-wider border-b border-slate-700 pb-2">{t.instructionsTitle}</h2>
        
        <div className="space-y-4 font-mono text-sm">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
             <h3 className="text-yellow-500 font-bold mb-1 uppercase text-xs tracking-wider">{t.objectiveTitle}</h3>
             <p className="text-slate-300">{t.objectiveTextPart1}<span className="text-red-400 font-bold">{t.objectiveTextPart2}</span>{t.objectiveTextPart3}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                <h3 className="text-yellow-500 font-bold mb-1 uppercase text-xs tracking-wider">{t.costTitle}</h3>
                <p className="text-slate-300">{t.costText}</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                <h3 className="text-yellow-500 font-bold mb-1 uppercase text-xs tracking-wider">{t.controlsTitle}</h3>
                <p className="text-slate-300">{t.controlsText}</p>
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
            <h3 className="text-yellow-500 font-bold mb-1 uppercase text-xs tracking-wider">{t.payoutsTitle}</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1 text-xs">
              <li>3 x <span className="text-red-500 font-bold">7</span> = 1000 {t.credits}</li>
              <li>3 x <span className="font-bold">BAR</span> = 200 {t.credits}</li>
              <li>3 x <span className="text-yellow-500 font-bold">{t.labelBell.toUpperCase()}</span> = 100 {t.credits}</li>
              <li>3 x <span className="text-red-400 font-bold">{t.labelCherry.toUpperCase()}</span> = 50 {t.credits}</li>
              <li>{t.anyCherry}</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-700/50 text-center">
          <p className="text-[10px] text-slate-500 italic mb-1">
            {t.simulationDisclaimer}
          </p>
          <p className="text-[10px] text-slate-500 italic">
            {t.privacyDisclaimer}
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black rounded-full font-bold font-display tracking-widest transition-transform active:scale-95 shadow-lg"
          >
            {t.playButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;