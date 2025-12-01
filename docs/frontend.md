# Frontend

## Introduzione

Il frontend dell’applicazione è sviluppato utilizzando:

- **React** per la costruzione dell’interfaccia a componenti
- **Vite** come bundler e dev server
- **Tailwind CSS** per lo styling tramite utility class

L’obiettivo è mantenere una struttura chiara, modulare e facilmente manutenibile.

---

## Struttura delle Cartelle del Frontend

- **/api**  
  Moduli per le chiamate HTTP verso il backend.  
  Contiene:
  - client HTTP (es. axios)
  - funzioni per le singole risorse (es. `getVoucherPurchasesApi`, `deleteVoucherPurchaseApi`)
  - gestione base di errori e response.

- **/assets**  
  Risorse statiche del frontend:
  - immagini
  - icone
  Utilizzate all’interno dei componenti React.

- **/components**  
  Componenti UI riutilizzabili:
  - tabelle
  - layout
  - modali 
  Si occupano principalmente di presentazione e composizione grafica.

- **/const**  
  Costanti condivise nel frontend:
  - valori statici (es. ruoli, stati, messaggi predefiniti).

- **/context**  
  React Context per la gestione dello stato globale:
  - autenticazione utente
  - notifiche 
  Contiene i provider e i relativi hook (es. `useAuth`, `useNotification`).

- **/hooks**  
  Custom hook React riutilizzabili:
  - gestione chiamate API 
  Permettono di separare la logica dalla pura UI dei componenti.

- **/i18n**  
  Configurazione dell’internazionalizzazione (i18n):
  - setup di `react-i18next`
  - file di traduzione delle lingue
  - definizione dei namespace e lingua di default.

- **/pages**  
  Pagine principali dell’applicazione, collegate alle route:
  - login / registrazione
  - pagine di gestione voucher, ecc.  
  Ogni pagina compone componenti, hook e context per costruire le viste complete.

- **/types**  
  Tipi e interfacce TypeScript condivise:
  - modelli dati (es. `User`, `VoucherPurchase`)
  - tipi di risposta delle API  
  Garantisce coerenza tipizzata tra API, componenti e hook.

- **/utils**  
  Funzioni di utilità generiche:
  - helper per gestione token e storage
  - piccole funzioni di supporto riutilizzabili.

