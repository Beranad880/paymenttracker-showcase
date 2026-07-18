import { useState, useEffect } from 'react';
import { Task } from './types';
import { X, Save } from 'lucide-react';

interface TaskFormProps {
  initialData?: Task | null;
  onSave: (task: Partial<Task>) => void;
  onCancel: () => void;
}

export default function TaskForm({ initialData, onSave, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'jiné',
    dueDate: '',
    repeat: 'once',
    price: '',
    note: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        dueDate: initialData.dueDate, // Should be YYYY-MM-DD
        repeat: initialData.repeat,
        price: initialData.price ? initialData.price.toString() : '',
        note: initialData.note || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      category: formData.category,
      dueDate: formData.dueDate,
      repeat: formData.repeat,
      price: formData.price ? parseInt(formData.price, 10) : null,
      note: formData.note
    });
  };

  const inputClasses = "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          {initialData ? 'Upravit položku' : 'Nová položka'}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1 md:col-span-2">
            <label className={labelClasses}>Název položky *</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClasses} placeholder="Např. Pojištění auta" />
          </div>

          <div className="space-y-1">
            <label className={labelClasses}>Kategorie *</label>
            <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputClasses}>
              <option value="pojištění">Pojištění</option>
              <option value="energie">Energie</option>
              <option value="auto">Auto</option>
              <option value="daně">Daně</option>
              <option value="předplatné">Předplatné</option>
              <option value="jiné">Jiné</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={labelClasses}>Datum splatnosti *</label>
            <input required type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className={inputClasses} />
          </div>

          <div className="space-y-1">
            <label className={labelClasses}>Opakování *</label>
            <select required value={formData.repeat} onChange={e => setFormData({...formData, repeat: e.target.value})} className={inputClasses}>
              <option value="once">Jednorázově</option>
              <option value="monthly">Měsíčně</option>
              <option value="yearly">Ročně</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={labelClasses}>Cena v Kč (volitelné)</label>
            <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={inputClasses} placeholder="Např. 1500" />
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <label className={labelClasses}>Poznámka</label>
            <textarea value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className={`${inputClasses} resize-none`} rows={3} placeholder="Doplňující informace..." />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            Zrušit
          </button>
          <button type="submit" className="px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Uložit položku
          </button>
        </div>
      </form>
    </div>
  );
}
