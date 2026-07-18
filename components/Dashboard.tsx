"use client";

import { useState, useEffect } from 'react';
import { Task, PaymentHistoryItem } from './types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import Analytics from './Analytics';
import HistoryList from './HistoryList';
import { Plus, Loader2, Filter } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, historyRes] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/history')
      ]);
      
      if (tasksRes.ok) setTasks(await tasksRes.json());
      if (historyRes.ok) setHistory(await historyRes.json());
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData)
        });
      } else {
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData)
        });
      }
      setIsFormOpen(false);
      setEditingTask(null);
      fetchData();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Opravdu chcete smazat tuto položku?')) return;
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handlePay = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}/pay`, { method: 'POST' });
      fetchData();
    } catch (error) {
      console.error('Failed to pay task', error);
    }
  };

  const handleUndo = async (id: number) => {
    if (!confirm('Opravdu chcete tuto platbu vrátit zpět? Obnoví se v seznamu povinností.')) return;
    try {
      await fetch(`/api/history/${id}/undo`, { method: 'POST' });
      fetchData();
    } catch (error) {
      console.error('Failed to undo task', error);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('Opravdu chcete nenávratně vymazat celou historii plateb?')) return;
    try {
      await fetch('/api/history', { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Failed to clear history', error);
    }
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const filteredTasks = filterCategory === 'all' 
    ? tasks 
    : tasks.filter(t => t.category === filterCategory);

  const categories = ['all', 'pojištění', 'energie', 'auto', 'daně', 'předplatné', 'jiné'];
  const categoryLabels: Record<string, string> = {
    'all': 'Všechny kategorie',
    'pojištění': 'Pojištění',
    'energie': 'Energie',
    'auto': 'Auto',
    'daně': 'Daně',
    'předplatné': 'Předplatné',
    'jiné': 'Jiné'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {!loading && tasks.length > 0 && <Analytics tasks={tasks} />}
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Filter className="w-5 h-5" />
          </div>
          <select 
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)}
            className="flex-1 sm:w-48 rounded-lg border-none bg-slate-50 dark:bg-slate-800 text-sm py-2 px-3 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 dark:text-slate-300 cursor-pointer transition-shadow outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{categoryLabels[cat]}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
          className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Přidat položku
        </button>
      </div>

      {/* Form Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <TaskForm 
              initialData={editingTask} 
              onSave={handleSave} 
              onCancel={() => { setIsFormOpen(false); setEditingTask(null); }} 
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
          <p className="font-medium">Načítám data...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Žádné povinnosti k zobrazení</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">Nejsou zde žádné platby v této kategorii.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={handleDelete}
              onEdit={openEditForm}
              onPay={handlePay}
            />
          ))}
        </div>
      )}

      {!loading && <HistoryList history={history} onUndo={handleUndo} onClearAll={handleClearHistory} />}
    </div>
  );
}
