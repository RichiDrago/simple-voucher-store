# Backend

## Introduzione

Il backend dell’applicazione è sviluppato utilizzando **Node.js** e il framework **Express**.  

Per la gestione del database viene utilizzato **Sequelize**, un ORM che consente di interagire con diversi database SQL tramite modelli e query ad alto livello.

Per il testing delle API viene utilizzato **Bruno**, un moderno API Client open-source:
👉 https://www.usebruno.com/

---

## Struttura delle Cartelle del Backend

- **/config**  
  Configurazioni generali (database, variabili ambiente, setup applicazione)

- **/const**  
  Costanti condivise (enum, codici di errore, ruoli, configurazioni statiche)

- **/controller**  
  Controller HTTP: gestiscono le richieste e le risposte verso il client

- **/dal**  
  Data Access Layer: interfaccia tra servizi e modelli ORM per accedere ai dati

- **/dto**  
  Data Transfer Object: validazione e trasformazione dei dati in entrata/uscita

- **/middleware**  
  Middleware Express: autenticazione, validazioni, logger, gestione errori

- **/model**  
  Modelli Sequelize che rappresentano le tabelle del database e le loro relazioni

- **/route**  
  Definizione delle rotte REST e associazione ai controller

- **/seed**  
  Script per popolare il database con dati iniziali o di test

- **/service**  
  Logica di business dell’applicazione; orchestrazione tra controller, DAL, modelli

- **/utils**  
  Funzioni di utilità riutilizzabili (helper, gestione token, formattazioni, ecc.)

- **server.ts**  
  Entry point dell'applicazione: avvio del server Express e caricamento dei moduli