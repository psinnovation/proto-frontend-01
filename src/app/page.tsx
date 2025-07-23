
export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center bg-white">
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-400 to-blue-500 shadow-lg">
        {/* Icona logo/placeholder */}
        <span className="text-4xl text-white font-bold">EP</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">Benvenuto in Europolish Dashboard</h1>
      <p className="text-lg text-neutral-600 mb-6 max-w-xl mx-auto">
        Gestisci in modo semplice e sicuro le importazioni DDT, monitora i task schedulati e tieni sotto controllo tutte le operazioni della tua azienda.<br />
        Utilizza la barra laterale per navigare tra le funzionalità.
      </p>
      <div className="flex flex-col items-center gap-2 text-neutral-500 text-sm">
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Hai bisogno di aiuto? Consulta la documentazione o contatta il supporto.
        </span>
        <span className="italic flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-10 4h6m-6 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Ultimo accesso: 21/07/2025
        </span>
      </div>
    </section>
  );
}
