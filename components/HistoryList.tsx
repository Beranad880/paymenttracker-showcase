import { PaymentHistoryItem } from './types';
import { format } from 'date-fns';
import { CheckCircle2, History, Undo2 } from 'lucide-react';

export default function HistoryList({ history, onUndo, onClearAll }: { history: PaymentHistoryItem[], onUndo: (id: number) => void, onClearAll: () => void }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Historie plateb</h2>
        </div>
        <button onClick={onClearAll} className="text-sm font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40">
          Vymazat historii
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                <div className="flex gap-2 text-xs font-medium text-slate-500">
                  <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{item.category}</span>
                  <span>{format(new Date(item.paidAt), 'dd.MM.yyyy HH:mm')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {item.price && (
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  {item.price.toLocaleString('cs-CZ')} Kč
                </div>
              )}
              <button onClick={() => onUndo(item.id)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors shadow-sm bg-white dark:bg-slate-800" title="Vrátit platbu zpět">
                <Undo2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
