"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Select } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Table, TableHead, TableRow, TableCell, TableHeaderCell } from "./ui/table";

// Dati mock per la tabella DDT
const mockDdt = [
    {
        id: 454424,
        data: "02/04/2022 12:50",
        tipo: "SC",
        spedizione: 55169,
        prgOrdine: 5695,
        prgRiga: 13,
        codice: "PS0170V1",
        descrizione: "EPSU 31900V1, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454425,
        data: "02/04/2022 13:10",
        tipo: "SC",
        spedizione: 55170,
        prgOrdine: 5696,
        prgRiga: 14,
        codice: "PS0170V2",
        descrizione: "EPSU 31900V2, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454426,
        data: "02/04/2022 13:30",
        tipo: "SC",
        spedizione: 55171,
        prgOrdine: 5697,
        prgRiga: 15,
        codice: "PS0170V3",
        descrizione: "EPSU 31900V3, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454427,
        data: "02/04/2022 14:00",
        tipo: "SC",
        spedizione: 55172,
        prgOrdine: 5698,
        prgRiga: 16,
        codice: "PS0170V4",
        descrizione: "EPSU 31900V4, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454428,
        data: "02/04/2022 14:30",
        tipo: "SC",
        spedizione: 55173,
        prgOrdine: 5699,
        prgRiga: 17,
        codice: "PS0170V5",
        descrizione: "EPSU 31900V5, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454429,
        data: "02/04/2022 14:50",
        tipo: "SC",
        spedizione: 55174,
        prgOrdine: 5700,
        prgRiga: 18,
        codice: "PS0170V6",
        descrizione: "EPSU 31900V6, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454430,
        data: "02/04/2022 15:10",
        tipo: "SC",
        spedizione: 55175,
        prgOrdine: 5701,
        prgRiga: 19,
        codice: "PS0170V7",
        descrizione: "EPSU 31900V7, PASTA ABR POLIFLUID PL",
    },
    {
        id: 454431,
        data: "02/04/2022 15:30",
        tipo: "SC",
        spedizione: 55176,
        prgOrdine: 5702,
        prgRiga: 20,
        codice: "PS0170V8",
        descrizione: "EPSU 31900V8, PASTA ABR POLIFLUID PL",
    },
];



type Stato = "vuoto" | "pronto" | "importazione" | "concluso";

export function ImportDdtTable() {
    // Stato demo: cambia per vedere i diversi scenari
    const [stato, setStato] = useState<Stato>("vuoto");
    const [search, setSearch] = useState("");
    const [spedizione, setSpedizione] = useState("spedizione");
    const [ordine, setOrdine] = useState("online");
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    // Filtra i dati mock
    const filtered = mockDdt.filter((row) =>
        row.descrizione.toLowerCase().includes(search.toLowerCase())
    );
    const totalRows = filtered.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    // Stato 1: Nessun DDT da importare
    if (stato === "vuoto") {
        return (
            <section className="bg-white rounded shadow p-6 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold">Importazione DDT</h2>
                    <Select
                        options={[
                            { label: "Vuoto", value: "vuoto" },
                            { label: "Pronto", value: "pronto" },
                            { label: "Importazione in corso", value: "importazione" },
                            { label: "Concluso", value: "concluso" },
                        ]}
                        value={stato}
                        onChange={(e) => {
                            setStato(e.target.value as Stato);
                            setPage(1); // resetta la paginazione quando cambi stato
                        }}
                        className="min-w-[200px]"
                    />
                </div>
                {/* Breadcrumb/path visuale */}
                <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4 self-start" aria-label="breadcrumb">
                    <span className="text-neutral-500">Procedure</span>
                    <span className="mx-1">/</span>
                    <span className="text-neutral-800 font-semibold">Import DDT</span>
                </nav>
                {/* ...existing code... */}
                <div className="flex items-center gap-4 w-full mb-6">
                    <Select
                        options={[{ label: "Spedizione", value: "spedizione" }]}
                        value={spedizione}
                        onChange={(e) => setSpedizione(e.target.value)}
                    />
                    <Select
                        options={[{ label: "Online", value: "online" }]}
                        value={ordine}
                        onChange={(e) => setOrdine(e.target.value)}
                    />
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1"
                    />
                    <span className="text-sm text-neutral-500">0 ddt da importare | Ultimo aggiornamento 21/07/2025 10:00</span>
                    <Button>
                        {/* Icona download (placeholder) */}
                        <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
                        Scarica DDT
                    </Button>
                </div>
                {/* ...existing code... */}
                <div className="flex flex-col items-center justify-center py-12 w-full">
                    {/* Illustrazione centrale (placeholder) */}
                    <div className="w-24 h-24 bg-neutral-200 rounded mb-4 flex items-center justify-center">
                        {/* Sostituisci con un'icona o immagine */}
                    </div>
                    <span className="text-neutral-500 mb-4">Nessun DDT da importare</span>
                    <Button>
                        {/* Icona download (placeholder) */}
                        <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
                        Scarica DDT
                    </Button>
                </div>
            </section>
        );
    }

    // Stato 2: DDT da importare
    if (stato === "pronto") {
        return (
            <section className="bg-white rounded shadow p-6 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold">Importazione DDT</h2>
                    <Select
                        options={[
                            { label: "Vuoto", value: "vuoto" },
                            { label: "Pronto", value: "pronto" },
                            { label: "Importazione in corso", value: "importazione" },
                            { label: "Concluso", value: "concluso" },
                        ]}
                        value={stato}
                        onChange={(e) => {
                            setStato(e.target.value as Stato);
                            setPage(1); // resetta la paginazione quando cambi stato
                        }}
                        className="min-w-[200px]"
                    />
                </div>
                {/* Breadcrumb/path visuale */}
                <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4 self-start" aria-label="breadcrumb">
                    <span className="text-neutral-500">Procedure</span>
                    <span className="mx-1">/</span>
                    <span className="text-neutral-800 font-semibold">Import DDT</span>
                </nav>
                <div className="flex items-center gap-4 mb-6">
                    <Select options={[{ label: "Spedizione", value: "spedizione" }]} value={spedizione} onChange={(e) => setSpedizione(e.target.value)} />
                    <Select options={[{ label: "Online", value: "online" }]} value={ordine} onChange={(e) => setOrdine(e.target.value)} />
                    <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1" />
                    <span className="text-sm text-neutral-500">{filtered.length} ddt da importare | Ultimo aggiornamento 21/07/2025 10:00</span>
                    <Button>
                        {/* Icona download (placeholder) */}
                        <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
                        Scarica DDT
                    </Button>
                </div>
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
                                    {/* Menu a tre puntini (placeholder) */}
                                    <span className="w-5 h-5 bg-neutral-300 rounded-full inline-block" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
                {/* Paginazione base */}
                <div className="flex items-center justify-between mt-4 text-sm">
                    <span>Rows per page: {rowsPerPage}</span>
                    <span>
                        {totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1}
                        -{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
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
                {/* Box avviso grigio */}
                <div className="mt-6 p-4 bg-neutral-100 rounded text-neutral-700 text-center">
                    Nessuna importazione effettuata oggi
                </div>
            </section>
        );
    }

    // Stato 3: Importazione in corso
    if (stato === "importazione") {
        return (
            <section className="bg-white rounded shadow p-6 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold">Importazione DDT</h2>
                    <Select
                        options={[
                            { label: "Vuoto", value: "vuoto" },
                            { label: "Pronto", value: "pronto" },
                            { label: "Importazione in corso", value: "importazione" },
                            { label: "Concluso", value: "concluso" },
                        ]}
                        value={stato}
                        onChange={(e) => {
                            setStato(e.target.value as Stato);
                            setPage(1); // resetta la paginazione quando cambi stato
                        }}
                        className="min-w-[200px]"
                    />
                </div>
                {/* Breadcrumb/path visuale */}
                <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4 self-start" aria-label="breadcrumb">
                    <span className="text-neutral-500">Procedure</span>
                    <span className="mx-1">/</span>
                    <span className="text-neutral-800 font-semibold">Import DDT</span>
                </nav>
                <div className="flex items-center gap-4 mb-6">
                    <Select options={[{ label: "Spedizione", value: "spedizione" }]} value={spedizione} onChange={(e) => setSpedizione(e.target.value)} />
                    <Select options={[{ label: "Online", value: "online" }]} value={ordine} onChange={(e) => setOrdine(e.target.value)} />
                    <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1" />
                    <span className="text-sm text-neutral-500">{filtered.length} ddt da importare | Ultimo aggiornamento 21/07/2025 10:00</span>
                    <Button>
                        {/* Icona checkmark (placeholder) */}
                        <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
                        Controlla DDT
                    </Button>
                </div>
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
                                    {/* Menu a tre puntini (placeholder) */}
                                    <span className="w-5 h-5 bg-neutral-300 rounded-full inline-block" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
                {/* Paginazione base */}
                <div className="flex items-center justify-between mt-4 text-sm">
                    <span>Rows per page: {rowsPerPage}</span>
                    <span>
                        {totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1}
                        -{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
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
                {/* Box avviso giallo/arancione */}
                <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-yellow-800 text-center flex items-center gap-2 justify-center">
                    {/* Icona caricamento/info (placeholder) */}
                    <span className="w-5 h-5 bg-yellow-400 rounded-full animate-spin" />
                    Importazione in corso...
                </div>
            </section>
        );
    }

    // Stato 4: Importazione conclusa
    if (stato === "concluso") {
        return (
            <section className="bg-white rounded shadow p-6 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold">Importazione DDT</h2>
                    <Select
                        options={[
                            { label: "Vuoto", value: "vuoto" },
                            { label: "Pronto", value: "pronto" },
                            { label: "Importazione in corso", value: "importazione" },
                            { label: "Concluso", value: "concluso" },
                        ]}
                        value={stato}
                        onChange={(e) => {
                            setStato(e.target.value as Stato);
                            setPage(1); // resetta la paginazione quando cambi stato
                        }}
                        className="min-w-[200px]"
                    />
                </div>
                {/* Breadcrumb/path visuale */}
                <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4 self-start" aria-label="breadcrumb">
                    <span className="text-neutral-500">Procedure</span>
                    <span className="mx-1">/</span>
                    <span className="text-neutral-800 font-semibold">Import DDT</span>
                </nav>
                <div className="flex items-center gap-4 mb-6">
                    <Select options={[{ label: "Spedizione", value: "spedizione" }]} value={spedizione} onChange={(e) => setSpedizione(e.target.value)} />
                    <Select options={[{ label: "Online", value: "online" }]} value={ordine} onChange={(e) => setOrdine(e.target.value)} />
                    <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1" />
                    <span className="text-sm text-neutral-500">{filtered.length} ddt da importare | Ultimo aggiornamento 21/07/2025 10:00</span>
                    <Button>
                        {/* Icona checkmark (placeholder) */}
                        <span className="w-4 h-4 bg-green-700 rounded mr-2 inline-block" />
                        Controlla DDT
                    </Button>
                </div>
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
                                    {/* Menu a tre puntini (placeholder) */}
                                    <span className="w-5 h-5 bg-neutral-300 rounded-full inline-block" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
                {/* Paginazione base */}
                <div className="flex items-center justify-between mt-4 text-sm">
                    <span>Rows per page: {rowsPerPage}</span>
                    <span>
                        {totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1}
                        -{Math.min(page * rowsPerPage, totalRows)} of {totalRows}
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
                {/* Box avviso verde */}
                <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-400 rounded text-green-800 text-center">
                    Importazione conclusa alle 16:22
                </div>
            </section>
        );
    }

    return null;
}
