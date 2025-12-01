import React from "react";

// Components
import { Navbar } from "./Navbar";

type PageProps = {
    /** Titolo principale della pagina */
    title?: string;
    /** Sottotitolo / descrizione sotto il titolo */
    subtitle?: string;
    /** Contenuto principale della pagina */
    children: React.ReactNode;
    /** Azioni in alto a destra (es. bottoni) */
    actions?: React.ReactNode;
    /** Classe aggiuntiva per personalizzazioni extra */
    className?: string;
};

export const Page: React.FC<PageProps> = ({ title, subtitle, children, actions, className = "" }) => {
    return (
        <div className={`box-border flex min-h-screen w-full flex-col bg-slate-200/30`}>
            {/* Navbar */}
            <Navbar />
            {/* Body */}
            <div className={`m-6 flex max-w-screen flex-1 flex-col rounded-lg bg-white p-6 shadow-sm ${className}`}>
                {/* Title & actions */}
                {(title || actions) && (
                    <header className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                            {title && <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>}
                            {subtitle && <p className="mt-1 text-sm text-slate-500 sm:text-base">{subtitle}</p>}
                        </div>
                        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
                    </header>
                )}
                {/* Main content */}
                <main className="flex h-full flex-1 flex-col space-y-4">{children}</main>
            </div>
        </div>
    );
};
