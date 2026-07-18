import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12">
        <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Připomenutí <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Plateb</span>
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 font-medium">
              Udržte si přehled o všech svých povinnostech.
            </p>
          </div>
          
          <div className="hidden sm:block">
            {/* Optional decorative element */}
            <div className="h-16 w-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
          </div>
        </header>
        
        <Dashboard />
      </div>
    </main>
  );
}
