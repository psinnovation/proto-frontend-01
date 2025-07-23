"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from "../../lib/store";
import { fetchDdtData, selectImportState, DdtItem, resetImportCycle } from "../../lib/features/importDdt/importDdtSlice";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Table, TableHead, TableRow, TableCell, TableHeaderCell } from "./ui/table";

// Componente per la tabella
const DdtDisplayTable = ({
    data
}: {
    data: DdtItem[]
}) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell><input type="checkbox" /></TableHeaderCell>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Data Creazione</TableHeaderCell>
                        <TableHeaderCell>Tipo Movimento</TableHeaderCell>
                        <TableHeaderCell>ID Spedizione</TableHeaderCell>
                        <TableHeaderCell>Prg Ordine</TableHeaderCell>
                        <TableHeaderCell>Prg Ordine Riga</TableHeaderCell>
                        <TableHeaderCell>Codice Articolo</TableHeaderCell>
                        <TableHeaderCell>Descrizione Articolo</TableHeaderCell>
                        <TableHeaderCell> </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <tbody>
                    {paginated.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell><input type="checkbox" /></TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.data}</TableCell>
                            <TableCell>{row.tipo}</TableCell>
                            <TableCell>{row.spedizione}</TableCell>
                            <TableCell>{row.prgOrdine}</TableCell>
                            <TableCell>{row.prgRiga}</TableCell>
                            <TableCell>{row.codice}</TableCell>
                            <TableCell>{row.descrizione}</TableCell>
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
                        size="icon" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || totalRows === 0}
                    >
                        &#8594;
                    </Button>
                </div>
            </div>
        </>
    );
};


export function ImportDdtTable() {
    // Connessione a Redux
    const dispatch: AppDispatch = useDispatch();
    const {
        status,
        ddtsToImport,
        lastImportTimestamp
    } = useSelector(selectImportState);

    const handleDownload = () => {
        dispatch(fetchDdtData());
    };

    const handleReset = () => {
        dispatch(resetImportCycle());
    }

    const ddtCount = ddtsToImport.length;
    const isDownloading = status === 'loading';
    const isReady = status === 'ready';
    const isImporting = status === 'importing';
    const isCompleted = status === 'completed';
    const isIdle = status === 'idle';

    return (
        <section className="bg-white rounded shadow p-6 flex flex-col">
            <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    {/* Icona documento */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h10.5A2.25 2.25 0 0019.5 17.25v-3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75h-7.5m7.5 3h-7.5m7.5 3h-7.5" />
                    </svg>
                    Importazione DDT
                </h2>
                {/* Pulsante per resettare il ciclo per la demo */}
                <Button onClick={handleReset} variant="outline" size="sm">Reset Ciclo</Button>
            </div>
            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4 self-start" aria-label="breadcrumb">
                <span className="text-neutral-500">Procedure</span>
                <span className="mx-1">/</span>
                <span className="text-neutral-800 font-semibold flex items-center gap-1">
                    {/* Icona documento piccola */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h10.5A2.25 2.25 0 0019.5 17.25v-3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75h-7.5m7.5 3h-7.5m7.5 3h-7.5" />
                    </svg>
                    Import DDT
                </span>
            </nav>
            <div className="flex items-center gap-4 mb-6">
                <Select options={[{ label: "Spedizione", value: "spedizione" }]} />
                <Select options={[{ label: "Online", value: "online" }]} />
                <Input placeholder="Search..." className="flex-1" />
                <span className="text-sm text-neutral-500 min-w-max">
                    {ddtCount > 0 ? `${ddtCount} ddt da importare` : '0 ddt da importare'} | Ultimo aggiornamento 22/07/2025 11:50
                </span>
                <Button onClick={handleDownload} disabled={isDownloading || isReady || isImporting}>
                    {isDownloading ? 'Scaricando...' : 'Scarica DDT'}
                </Button>
            </div>

            {/* Stato IDLE: nessun DDT da importare */}
            {isIdle && (
                <div className="flex flex-col items-center justify-center py-12 w-full border-t">
                    <div className="w-24 h-24 bg-neutral-200 rounded mb-4 flex items-center justify-center">
                        {/* Icona documento grande */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-50 h-50 text-blue-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h10.5A2.25 2.25 0 0019.5 17.25v-3" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75h-7.5m7.5 3h-7.5m7.5 3h-7.5" />
                        </svg>
                    </div>
                    <span className="text-neutral-500 mb-4">Nessun DDT da importare</span>
                    <Button onClick={handleDownload} disabled={isDownloading}>
                        {isDownloading ? 'Scaricando...' : 'Scarica DDT'}
                    </Button>
                </div>
            )}

            {/* Stato LOADING: spinner di caricamento */}
            {isDownloading && (
                <div className="flex flex-col items-center justify-center py-12 w-full border-t">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-neutral-500 mt-4">Download dei DDT in corso...</span>
                </div>
            )}

            {/* Stato READY o IMPORTING o COMPLETED: mostra la tabella */}
            {(isReady || isImporting || isCompleted) && ddtsToImport.length > 0 && (
                <DdtDisplayTable data={ddtsToImport} />
            )}

            {/* Box di avviso inferiore */}
            <div className="mt-6">
                {isReady && (
                    <div className="p-4 bg-neutral-100 rounded text-neutral-700 text-center">
                        Nessuna importazione effettuata oggi
                    </div>
                )}
                {isImporting && (
                    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-yellow-800 text-center flex items-center gap-2 justify-center">
                        <span className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                        Importazione in corso...
                    </div>
                )}
                {isCompleted && (
                    <div className="p-4 bg-green-100 border-l-4 border-green-400 rounded text-green-800 text-center">
                        Importazione conclusa alle {lastImportTimestamp}
                    </div>
                )}
            </div>
        </section>
    );
}