"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeaderCell } from "./ui/table";
import { Select } from "./ui/select";

type Stato = "vuoto" | "pronto" | "importazione" | "concluso";

// Dati mock per dettagli importazione
const mockDettagli = [
  {
    status: "success",
    spedizione: 55169,
    prgOrdine: 5695,
    prgRiga: 13,
    codice: "PS0170V1",
    descrizione: "EPSU 31900V1, PASTA ABR POLIFLUID PL",
    messaggio: "Importazione riuscita.",
  },
  {
    status: "error",
    spedizione: 55170,
    prgOrdine: 5696,
    prgRiga: 14,
    codice: "PS0170V2",
    descrizione: "EPSU 31900V2, PASTA ABR POLIFLUID PL",
    messaggio: "Riferimento all'ordine non corretto.",
  },
];

export function LastImportDetails() {
  // Stato demo: cambia per vedere i diversi scenari
  const [stato, setStato] = useState<Stato>("vuoto");

  // Stato 1 e 2: Nessuna importazione oggi
  if (stato === "vuoto" || stato === "pronto") {
    return (
      <section className="bg-white rounded shadow p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-lg font-semibold">Dettagli ultima importazione di oggi</h2>
          <Select
            options={[
              { label: "Vuoto", value: "vuoto" },
              { label: "Pronto", value: "pronto" },
              { label: "Importazione in corso", value: "importazione" },
              { label: "Concluso", value: "concluso" },
            ]}
            value={stato}
            onChange={e => setStato(e.target.value as Stato)}
            className="min-w-[200px]"
          />
        </div>
        <div className="text-neutral-500 mb-6">Nessuna importazione oggi</div>
        <div className="flex justify-end">
          <Button>
            {/* Icona download (placeholder) */}
            <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
            Importa DDT
          </Button>
        </div>
      </section>
    );
  }

  // Stato 3: Importazione in corso
  if (stato === "importazione") {
    return (
      <section className="bg-white rounded shadow p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-lg font-semibold">Dettagli ultima importazione di oggi</h2>
          <Select
            options={[
              { label: "Vuoto", value: "vuoto" },
              { label: "Pronto", value: "pronto" },
              { label: "Importazione in corso", value: "importazione" },
              { label: "Concluso", value: "concluso" },
            ]}
            value={stato}
            onChange={e => setStato(e.target.value as Stato)}
            className="min-w-[200px]"
          />
        </div>
        <div className="text-neutral-500 mb-6">Importazione in corso...</div>
        <div className="flex justify-end">
          <Button disabled>
            {/* Icona download (placeholder) */}
            <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
            Importa DDT
          </Button>
        </div>
      </section>
    );
  }

  // Stato 4: Importazione conclusa
  if (stato === "concluso") {
    return (
      <section className="bg-white rounded shadow p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Dettagli ultima importazione di oggi</h2>
          <Select
            options={[
              { label: "Vuoto", value: "vuoto" },
              { label: "Pronto", value: "pronto" },
              { label: "Importazione in corso", value: "importazione" },
              { label: "Concluso", value: "concluso" },
            ]}
            value={stato}
            onChange={e => setStato(e.target.value as Stato)}
            className="min-w-[200px]"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-neutral-500">Importazione #231 - 25/06/2025 16:22</span>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="px-3 py-1 rounded bg-neutral-200 text-neutral-700 text-xs font-semibold">All 8</div>
          <div className="px-3 py-1 rounded bg-green-200 text-green-700 text-xs font-semibold">Success 6</div>
          <div className="px-3 py-1 rounded bg-red-200 text-red-700 text-xs font-semibold">Error 2</div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Spedizione</TableHeaderCell>
              <TableHeaderCell>Prg Ordine</TableHeaderCell>
              <TableHeaderCell>Prg Ordine Riga</TableHeaderCell>
              <TableHeaderCell>Codice Articolo</TableHeaderCell>
              <TableHeaderCell>Descrizione Articolo</TableHeaderCell>
              <TableHeaderCell>Messaggio</TableHeaderCell>
              <TableHeaderCell> </TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {mockDettagli.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  {row.status === "success" ? (
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">Success</span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">Error</span>
                  )}
                </TableCell>
                <TableCell>{row.spedizione}</TableCell>
                <TableCell>{row.prgOrdine}</TableCell>
                <TableCell>{row.prgRiga}</TableCell>
                <TableCell>{row.codice}</TableCell>
                <TableCell>{row.descrizione}</TableCell>
                <TableCell>{row.messaggio}</TableCell>
                <TableCell>
                  {/* Menu a tre puntini (placeholder) */}
                  <span className="w-5 h-5 bg-neutral-300 rounded-full inline-block" />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        {/* Paginazione base */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <span>Rows per page: 10</span>
          <span>1-2 of 2</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">&#8592;</Button>
            <Button variant="outline" size="icon">&#8594;</Button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button>
            {/* Icona download (placeholder) */}
            <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
            Importa DDT
          </Button>
        </div>
      </section>
    );
  }

  return null;
}
