export default function AhojPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black flex items-center justify-center text-white p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-12 rounded-3xl shadow-2xl transform transition-all hover:-translate-y-2 duration-300 max-w-md w-full text-center group">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
            <span className="text-4xl">👋</span>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400 mb-4 tracking-tight">
          Ahoj!
        </h1>
        <p className="text-lg text-gray-300 font-medium leading-relaxed">
          Toto je tvá nová cesta <code className="bg-black/30 px-2 py-1 rounded text-teal-300 text-sm">/ahoj</code> vyrenderovaná v Reactu.
        </p>
      </div>
    </main>
  );
}
