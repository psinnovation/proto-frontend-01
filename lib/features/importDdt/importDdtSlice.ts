import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// --- TIPI DI DATO ---
// Definiamo le interfacce per i nostri dati per avere un codice più pulito e sicuro.
export interface DdtItem {
    id: number;
    data: string;
    tipo: string;
    spedizione: number;
    prgOrdine: number;
    prgRiga: number;
    codice: string;
    descrizione: string;
}

export interface ImportResult extends DdtItem {
    status: 'success' | 'error';
    messaggio: string;
}

// --- STATO DELLO SLICE ---
// Questo è lo stato che verrà gestito da Redux.
export interface ImportDdtState {
    ddtsToImport: DdtItem[];
    importResults: ImportResult[];
    lastImportTimestamp: string | null;
    // Lo stato del processo: idle (in attesa), loading (scaricando i DDT), 
    // ready (pronto per l'import), importing (importazione in corso), completed (concluso)
    status: 'idle' | 'loading' | 'ready' | 'importing' | 'completed';
    error: string | null;
}

const initialState: ImportDdtState = {
    ddtsToImport: [],
    importResults: [],
    lastImportTimestamp: null,
    status: 'idle',
    error: null,
};

// --- DATI MOCK ---
// Dati mock per simulare una fonte dati esterna.
const mockDdt: DdtItem[] = [
    { id: 454424, data: "02/04/2022 12:50", tipo: "SC", spedizione: 55169, prgOrdine: 5695, prgRiga: 13, codice: "PS0170V1", descrizione: "EPSU 31900V1, PASTA ABR POLIFLUID PL" },
    { id: 454425, data: "02/04/2022 13:10", tipo: "SC", spedizione: 55170, prgOrdine: 5696, prgRiga: 14, codice: "PS0170V2", descrizione: "EPSU 31900V2, PASTA ABR POLIFLUID PL" },
    { id: 454426, data: "02/04/2022 13:30", tipo: "SC", spedizione: 55171, prgOrdine: 5697, prgRiga: 15, codice: "PS0170V3", descrizione: "EPSU 31900V3, PASTA ABR POLIFLUID PL" },
    { id: 454427, data: "02/04/2022 14:00", tipo: "SC", spedizione: 55172, prgOrdine: 5698, prgRiga: 16, codice: "PS0170V4", descrizione: "EPSU 31900V4, PASTA ABR POLIFLUID PL" },
    { id: 454428, data: "02/04/2022 14:30", tipo: "SC", spedizione: 55173, prgOrdine: 5699, prgRiga: 17, codice: "PS0170V5", descrizione: "EPSU 31900V5, PASTA ABR POLIFLUID PL" },
    { id: 454429, data: "02/04/2022 14:50", tipo: "SC", spedizione: 55174, prgOrdine: 5700, prgRiga: 18, codice: "PS0170V6", descrizione: "EPSU 31900V6, PASTA ABR POLIFLUID PL" },
    { id: 454430, data: "02/04/2022 15:10", tipo: "SC", spedizione: 55175, prgOrdine: 5701, prgRiga: 19, codice: "PS0170V7", descrizione: "EPSU 31900V7, PASTA ABR POLIFLUID PL" },
    { id: 454431, data: "02/04/2022 15:30", tipo: "SC", spedizione: 55176, prgOrdine: 5702, prgRiga: 20, codice: "PS0170V8", descrizione: "EPSU 31900V8, PASTA ABR POLIFLUID PL" },
];

// --- AZIONI ASINCRONE (THUNKS) ---

// Simula il download dei DDT da un server.
export const fetchDdtData = createAsyncThunk('importDdt/fetchData', async () => {
    console.log("Fetching DDT data...");
    // Simula un ritardo di rete di 1.5 secondi
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Data fetched!");
    return mockDdt;
});

// Simula il processo di importazione.
export const startImportProcess = createAsyncThunk('importDdt/startImport', async (_, { getState }) => {
    const state = getState() as RootState;
    const ddtsToImport = state.importDdt.ddtsToImport;

    console.log("Starting import process...");
    // Simula un'elaborazione di 2.5 secondi
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simula la logica di importazione con alcuni successi e alcuni errori
    const results: ImportResult[] = ddtsToImport.map((ddt, index) => {
        // Simuliamo un errore per ogni 4 DDT
        if (index > 0 && index % 4 === 0) {
            return { ...ddt, status: 'error', messaggio: 'Riferimento all\'ordine non corretto.' };
        }
        return { ...ddt, status: 'success', messaggio: 'Importazione riuscita.' };
    });

    console.log("Import process finished!");
    return results;
});


// --- SLICE ---
export const importDdtSlice = createSlice({
    name: 'importDdt',
    initialState,
    // Reducers per azioni sincrone
    reducers: {
        // Azione per resettare lo stato e iniziare un nuovo ciclo
        resetImportCycle: (state) => {
            state.status = 'idle';
            state.ddtsToImport = [];
            state.importResults = [];
            state.lastImportTimestamp = null;
            state.error = null;
        }
    },
    // Extra reducers per gestire gli stati delle azioni asincrone (pending, fulfilled, rejected)
    extraReducers: (builder) => {
        builder
            // Gestione di fetchDdtData
            .addCase(fetchDdtData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDdtData.fulfilled, (state, action: PayloadAction<DdtItem[]>) => {
                if (action.payload.length > 0) {
                    state.status = 'ready';
                    state.ddtsToImport = action.payload;
                } else {
                    state.status = 'idle'; // Ritorna a idle se non ci sono dati
                }
            })
            .addCase(fetchDdtData.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message || 'Failed to fetch DDT data';
            })
            // Gestione di startImportProcess
            .addCase(startImportProcess.pending, (state) => {
                state.status = 'importing';
            })
            .addCase(startImportProcess.fulfilled, (state, action: PayloadAction<ImportResult[]>) => {
                state.status = 'completed';
                state.importResults = action.payload;
                state.ddtsToImport = []; // Svuota la lista dei DDT da importare
                state.lastImportTimestamp = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
            })
            .addCase(startImportProcess.rejected, (state, action) => {
                state.status = 'ready'; // Torna a ready se l'import fallisce
                state.error = action.error.message || 'Import process failed';
            });
    },
});

// Esportiamo le azioni e i selettori
export const { resetImportCycle } = importDdtSlice.actions;

// I selettori ci permettono di leggere i dati dallo store nei componenti
export const selectImportState = (state: RootState) => state.importDdt;

export default importDdtSlice.reducer;