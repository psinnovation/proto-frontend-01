"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();
    const isImportDDT = pathname.startsWith("/procedure/import-ddt");
    const [open, setOpen] = useState(true);
    return (
        <aside className="w-64 bg-neutral-900 text-white flex flex-col min-h-screen">
            <div className="h-16 flex items-center justify-center font-bold text-2xl border-b border-neutral-800">
                <Link href="/" className="text-white flex items-center gap-3">
                    {/* Icona Home */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                </Link>
            </div>
            <nav className="flex-1 py-4">
                <ul className="space-y-2">
                    <button
                        className="w-full flex items-center gap-2 px-6 py-2 text-neutral-400 hover:text-white transition font-semibold focus:outline-none"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="procedure-list"
                    >
                        Procedure
                        <span className={`transition-transform ${open ? "rotate-90" : "rotate-0"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                    </button>
                    {open && (
                        <div id="procedure-list">
                            <li>
                                <Link
                                    href="/procedure/import-ddt"
                                    className={`flex items-center gap-3 px-10 py-2 rounded font-semibold transition-colors ${isImportDDT ? "bg-neutral-800" : "hover:bg-neutral-800"}`}
                                >
                                    {/* Icona download/import */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    Import DDT
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </aside>
    );
}
