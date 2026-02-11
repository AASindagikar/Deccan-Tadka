
# Deccan Tadka Deployment Guide

## Option 1: Quick Local Start (Your Laptop)
1.  **Prerequisites:** Install [Node.js](https://nodejs.org/).
2.  **Install:** Run `npm install` in your terminal.
3.  **Launch:** Run `npm run start:local`.
4.  **Visit:** [http://localhost:5173](http://localhost:5173) for the site and [http://localhost:5173/#/admin](http://localhost:5173/#/admin) for the CMS.

---

## Option 2: Server/VM Deployment (Docker)
1.  **Setup VM:** Set VirtualBox network to **Bridged Adapter**.
2.  **Install Docker:** `sudo apt install docker.io -y`.
3.  **Build:** `sudo docker build -t deccan-brand .`
4.  **Run:** `sudo docker run -d -p 80:80 --name deccan-live deccan-brand`

---

## Technical Architecture
- **Frontend:** React + Vite (Port 5173 locally, 80 in Docker).
- **Backend:** Node.js Express (Port 3001).
- **Persistence:** `db.json` (A file-based database for simplicity and easy migration).
