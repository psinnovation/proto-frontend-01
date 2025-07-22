
export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
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
        <span>Hai bisogno di aiuto? Consulta la documentazione o contatta il supporto.</span>
        <span className="italic">Ultimo accesso: 21/07/2025</span>
      </div>
    </section>
  );
}
