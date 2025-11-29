# simple-voucher-store

This document describes a technical challenge I was asked to complete as part of a job interview process. The task involved designing and implementing a simple, fully containerized ecommerce system focused on the purchase of vouchers, including backend, frontend, API documentation, and database design.

## Overview

Develop a simple ecommerce platform for purchasing vouchers. Each item in the ecommerce must include:
- A name
- A set of possible price denominations
- A description
- A set of associated assets (photos)

The ecommerce does not need shopping cart functionality. 

The backend must be built with **NodeJS**, **TypeScript**, and **Express**, while the database must be **MySQL**.

The application must include basic login and registration features (a simple username and hashed password is sufficient). 

Voucher purchases must be saved and retrieved by communicating with the backend through a token-authenticated REST API. The token is returned by a login function. There is no need to implement a refreshToken flow—just a regular **JWT access token** is enough.

Build a simple web interface using **React** (Next.js is also fine) and **TailwindCSS** to navigate the ecommerce and use all available APIs.

Everything must be containerized using **Docker** and **Docker Compose**, including the database.

Document, using a tool of your choice (Notion, the project’s README.md, etc.):
- The backend APIs, including requests (headers, body), responses (headers, body), and any error messages
- The database tables and their relationships (bonus points for an ER diagram made with tools like draw.io or Excalidraw)

Finally, publish the repository on GitHub.

**Time Available:** 7 days