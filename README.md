# simple-voucher-store

## Overview

Sviluppare un semplice ecommerce per l’acquisto di buoni.

Ogni voce dell’ecommerce deve avere:

- Un nome
- Una serie di tagli di prezzo possibili
- Una descrizione
- Una serie di asset (foto) associate

L’ecommerce non deve avere funzionalità di carrello.

Il backend con NodeJS con **TypeScript** ed **Express** mentre il DB deve essere il **MySQL**.

L’applicazione deve avere funzionalità base di login e registrazione (va benissimo un semplice nome utente e password hashata).

Gli acquisti di buoni vengono salvati e recuperati comunicando con il backend tramite un’API REST autenticata da token, restituito da una funzione di login (non preoccuparsi di implementare un flusso di refreshToken, basta un normale access **token JWT**).

Costruire una semplice interfaccia web con **React** (volendo anche NextJS) e **TailwindCSS** per navigare l’ecommerce utilizzando tutte le API a disposizione

Il tutto deve essere containerizzato tramite **Docker** e **Docker Compose**, incluso il DB.

Documentare utilizzando un tool di vostra preferenza (Notion, il [README.md](http://README.md) della repo...).:

- le API del backend con richiesta (header, body), risposta (header, body) ed eventuali messaggi di errore
- Le tabelle create sul DB e le relazioni tra di esse (plus se con schema ER creato con tool come [draw.io](http://draw.io) o excalidraw)

Pubblicare poi la repo su GitHub.

## Development

Ho suddiviso la challenge in tre aree principali: progettazione del database, sviluppo del backend e implementazione del frontend.
Nella documentazione qui sotto troverete una sezione dedicata a ciascuno di questi blocchi.

Per quanto riguarda la strategia dei branch, ho creato un branch principale chiamato `development`, dal quale ho poi derivato due branch dedicati: uno per il `frontend` e uno per il `backend`.
So che non si tratta di una strategia convenzionale, ma per un progetto di piccole dimensioni mi è risultata una soluzione pratica ed efficace.

La documentazione è organizzata nella cartella /docs, suddivisa nei seguenti file e directory:
- `api`: file generati da Bruno (client API).
- `assets`: risorse aggiuntive utilizzate nella documentazione (immagini, diagrammi, ecc.).
- `database`: documentazione relativa alla struttura del database, tabelle, relazioni.
- `backend`: descrizione dell’architettura e dell’organizzazione del progetto backend.
- `frontend`: descrizione dell’architettura e dell’organizzazione del progetto frontend.
- `api-reference`: documentazione di riferimento delle API (endpoint, richieste, risposte).