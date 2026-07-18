"use client";
import { Task } from './types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Analytics({ tasks }: { tasks: Task[] }) {
  let monthlyTotal = 0;
  let yearlyTotal = 0;
  
  const categoryTotals: Record<string, number> = {};

  tasks.forEach(task => {
    if (!task.price) return;
    
    let normalizedMonthlyPrice = 0;
    if (task.repeat === 'monthly') {
      normalizedMonthlyPrice = task.price;
      monthlyTotal += task.price;
      yearlyTotal += task.price * 12;
    } else if (task.repeat === 'yearly') {
      normalizedMonthlyPrice = task.price / 12;
      yearlyTotal += task.price;
      monthlyTotal += task.price / 12;
    }
    
    if (normalizedMonthlyPrice > 0) {
      if (!categoryTotals[task.category]) categoryTotals[task.category] = 0;
      categoryTotals[task.category] += normalizedMonthlyPrice;
    }
  });

  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  const COLORS = ['#3b82f6', '#eab308', '#64748b', '#a855f7', '#ec4899', '#f97316', '#14b8a6'];

  if (tasks.length === 0 || monthlyTotal === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Pravidelné měsíční výdaje</h3>
          <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{Math.round(monthlyTotal).toLocaleString('cs-CZ')} Kč</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Pravidelné roční výdaje</h3>
          <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{Math.round(yearlyTotal).toLocaleString('cs-CZ')} Kč</p>
        </div>
      </div>
      
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Rozložení měsíčních výdajů</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${Math.round(value).toLocaleString('cs-CZ')} Kč/měsíc`, 'Částka']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--color-background)' }}
                itemStyle={{ color: 'var(--color-foreground)' }}
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
