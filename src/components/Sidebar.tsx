"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();
    const isImportDDT = pathname.startsWith("/procedure/import-ddt");
    const isRun = pathname.startsWith("/procedure/run");
    const isTask = pathname.startsWith("/procedure/task");
    const [open, setOpen] = useState(true);
    return (
        <aside className="w-64 bg-neutral-900 text-white flex flex-col min-h-screen">
            <div className="h-16 flex items-center justify-center font-bold text-2xl border-b border-neutral-800">
                <Link href="/" className="text-white">
                    Home
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
                        <span className={`transition-transform ${open ? "rotate-90" : "rotate-0"}`}>
                            ▶
                        </span>
                        Procedure
                    </button>
                    {open && (
                        <div id="procedure-list">
                            <li>
                                <Link
                                    href="/procedure/import-ddt"
                                    className={`flex items-center gap-3 px-10 py-2 rounded font-semibold transition-colors ${isImportDDT ? "bg-neutral-800" : "hover:bg-neutral-800"}`}
                                >
                                    {/* Icona download/import */}
                                    <span className="w-5 h-5 bg-green-600 rounded" />
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
