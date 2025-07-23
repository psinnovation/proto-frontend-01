"use client";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from "../../lib/store";
import { startImportProcess, selectImportState, ImportResult } from "../../lib/features/importDdt/importDdtSlice";

import { Button } from "./ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeaderCell } from "./ui/table";

// Componente per la tabella dei risultati
const ResultsDisplayTable = ({
  results,
  lastImportTimestamp,
  currentCount
}: {
  results: ImportResult[],
  lastImportTimestamp: string | null,
  currentCount: number
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalRows = results.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginated = results.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-neutral-500">Importazione #{currentCount} - {lastImportTimestamp}</span>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="px-3 py-1 rounded bg-neutral-200 text-neutral-700 text-xs font-semibold">All {results.length}</div>
        <div className="px-3 py-1 rounded bg-green-200 text-green-700 text-xs font-semibold">Success {successCount}</div>
        <div className="px-3 py-1 rounded bg-red-200 text-red-700 text-xs font-semibold">Error {errorCount}</div>
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
          {paginated.map((row, i) => (
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
                <span className="w-5 h-5 bg-neutral-300 rounded-full inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <div className="flex items-center justify-between mt-4 text-sm">
        <span>Rows per page: {rowsPerPage}</span>
        <span>
          {totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            &#8592;
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalRows === 0}
          >
            &#8594;
          </Button>
        </div>
      </div>
    </>
  );
};

export function LastImportDetails() {
  const dispatch: AppDispatch = useDispatch();
  const {
    status,
    importResults,
    lastImportTimestamp
  } = useSelector(selectImportState);


  const [count, setCount] = useState(246);

  const handleImport = () => {
    setCount(c => c + 1);
    dispatch(startImportProcess());
  };

  const isReady = status === 'ready';
  const isImporting = status === 'importing';
  const isCompleted = status === 'completed';

  return (
    <section className="bg-white rounded shadow p-6 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-semibold">Dettagli ultima importazione di oggi</h2>
      </div>

      {/* Stato prima del completamento */}
      {(status === 'idle' || status === 'loading' || status === 'ready' || status === 'importing') && !isCompleted && (
        <div className="text-neutral-500 mb-6">Nessuna importazione oggi</div>
      )}

      {/* Stato completato: mostra i risultati */}
      {isCompleted && importResults.length > 0 && (
        <ResultsDisplayTable results={importResults} lastImportTimestamp={lastImportTimestamp} currentCount={count} />
      )}

      <div className="flex justify-end mt-auto pt-4">
        <Button onClick={handleImport} disabled={!isReady || isImporting}>
          {isImporting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />}
          {isImporting ? 'Importazione in corso...' : 'Importa DDT'}
        </Button>
      </div>
    </section>
  );
}