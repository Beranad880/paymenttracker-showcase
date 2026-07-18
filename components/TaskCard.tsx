import { Task } from './types';
import { differenceInDays, startOfDay } from 'date-fns';
import { Calendar, CreditCard, RefreshCw, Trash2, Edit2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onPay
}: {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onPay: (id: number) => void;
}) {
  const today = startOfDay(new Date());
  // Assuming dueDate from API is YYYY-MM-DD format as string
  const dueDate = startOfDay(new Date(task.dueDate));
  const daysLeft = differenceInDays(dueDate, today);
  
  let statusColor = 'border-l-emerald-500';
  let bgColor = 'bg-white dark:bg-slate-900';
  let textColor = 'text-emerald-600 dark:text-emerald-400';
  let statusIcon = <Calendar className="w-5 h-5" />;
  
  if (daysLeft < 0) {
    statusColor = 'border-l-rose-500';
    bgColor = 'bg-rose-50 dark:bg-rose-950/20';
    textColor = 'text-rose-700 dark:text-rose-400';
    statusIcon = <AlertCircle className="w-5 h-5" />;
  } else if (daysLeft <= 7) {
    statusColor = 'border-l-rose-500';
    textColor = 'text-rose-600 dark:text-rose-400';
  } else if (daysLeft <= 14) {
    statusColor = 'border-l-amber-500';
    textColor = 'text-amber-600 dark:text-amber-400';
  }

  const categoryColors: Record<string, string> = {
    'pojištění': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    'energie': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'auto': 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    'daně': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    'předplatné': 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    'jiné': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  };

  const catBadge = categoryColors[task.category] || categoryColors['jiné'];

  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 ${bgColor} p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 flex flex-col ${statusColor}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${catBadge}`}>
            {task.category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {task.title}
          </h3>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={() => onEdit(task)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors" title="Upravit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors" title="Smazat">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-2 text-sm flex-1">
        <div className="flex items-center text-slate-600 dark:text-slate-300">
          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
          <span className="font-medium">
            {dueDate.toLocaleDateString('cs-CZ')}
          </span>
        </div>
        
        {task.price !== null && (
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <CreditCard className="w-4 h-4 mr-2 text-slate-400" />
            <span className="font-semibold">{task.price.toLocaleString('cs-CZ')} Kč</span>
          </div>
        )}
        
        <div className="flex items-center text-slate-600 dark:text-slate-300">
          <RefreshCw className="w-4 h-4 mr-2 text-slate-400" />
          <span>{
            task.repeat === 'monthly' ? 'Měsíčně' :
            task.repeat === 'yearly' ? 'Ročně' : 'Jednorázově'
          }</span>
        </div>
        
        {task.note && (
          <div className="flex items-start text-slate-600 dark:text-slate-300 col-span-2 mt-2 bg-slate-50/50 dark:bg-slate-800/30 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/50">
            <FileText className="w-4 h-4 mr-2 mt-0.5 text-slate-400 shrink-0" />
            <span className="text-sm leading-relaxed">{task.note}</span>
          </div>
        )}
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        <div className={`flex items-center space-x-2 ${textColor}`}>
          {statusIcon}
          <span className="text-sm font-bold">
            {daysLeft < 0 ? `Zpoždění ${Math.abs(daysLeft)} dní!` : 
             daysLeft === 0 ? 'Dnes!' : `Za ${daysLeft} dní`}
          </span>
        </div>
        
        <button 
          onClick={() => onPay(task.id)} 
          className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Zaplaceno
        </button>
      </div>
    </div>
  );
}
