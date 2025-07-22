import React from "react";

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
      <div className="flex items-center gap-4">
        {/* Icona hamburger (solo mobile, placeholder) */}
        <span className="w-6 h-6 bg-neutral-200 rounded md:hidden" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-neutral-400 rounded-full" />
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
