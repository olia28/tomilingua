# TomiLingua — Distance English Learning Platform 

TomiLingua is a modern, distributed web application designed for distance English language learning with integrated user progress monitoring. This platform allows users to pass an initial onboarding placement test, register accounts, study modules (Reading, Grammar, Vocabulary), and save their scores in real time.

The system is built using a decoupled architecture (React frontend + Django REST Framework backend) and is fully containerized using Docker and orchestrated via an Nginx reverse proxy for production-grade stability and security.

## Architecture & Component Overview

The application is split into isolated services that communicate securely within a private Docker network:

* **Frontend:** Built with React.js, TypeScript, and Material-UI (MUI). It communicates with the server using relative API paths (`/api/...`), allowing it to adapt dynamically to any hosting domain or IP address.
* **Backend:** Built with Django and Django REST Framework (DRF). Operating with `DEBUG=False` for security. It uses **Token-based Authentication** (`rest_framework.authtoken`) for safe API communication, removing vulnerable session/CSRF cross-origin dependencies.
* **Database:** PostgreSQL 15 relational database, persisting all user data, test structures, and progress records.
* **Web Server / Reverse Proxy:** Nginx acts as the single entry point. It hosts the compiled static React files on port `8085` and securely proxies all `/api/` traffic internally to the Gunicorn WSGI application server running Python.

---

##  Prerequisites for Non-Technical Users (One-Time Setup)

To run this platform on a local machine, you only need to install two free, automated tools:

1.  **Git** (To clone the project source code): [Download for Windows](https://git-scm.com/download/win)
2.  **Docker Desktop** (The main engine that builds and runs the entire website in one click): [Download for Windows](https://www.docker.com/products/docker-desktop/)

>  **Important:** After installing **Docker Desktop**, you must launch the application. Keep it running in the background (a little green whale icon will appear in your Windows system tray near the clock).

---

##  Step-by-Step Deployment Guide

### Step 1: Clone the Repository
Open Git Bash, Command Prompt, or PowerShell in your desired projects folder (e.g., `C:\Projects`) and run:
```bash
git clone [https://github.com/olia28/tomilingua.git](https://github.com/olia28/tomilingua.git)
cd tomilingua

```

### Step 2: Configure Environment Variables (Security Check)

For production safety, secret database keys and credentials are kept hidden from the source code. You need to provide them locally:

1. In the root directory of the project (`tomilingua/`), create a new plain text file and name it exactly **`.env`** (Make sure it does not end with `.txt`).
2. Open it with Notepad and paste the following environment configuration:
```text
POSTGRES_DB=tomilingua_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=createyourownpass
DB_NAME=tomilingua_db
DB_USER=admin
DB_PASS=createyourownpass
DB_HOST=db
DB_PORT=5432
SECRET_KEY=django-insecure-production-ready-key-placeholder
EMAIL_HOST_PASSWORD=***

```


3. Save and close the file.

>  *Note: The `.env` file is listed in `.gitignore` and will never be pushed to public GitHub repositories to prevent security leaks.*

### Step 3: Domain Mapping (Optional / Recommended)

To open the website using a beautiful local domain name (`http://tomilingua.local:8085`) instead of a raw IP address:

1. Open **Notepad** as an Administrator (Right-click -> *Run as administrator*).
2. Open the following file: `C:\Windows\System32\drivers\etc\hosts` (Change the file type dropdown from "Text Documents" to "All Files" to see it).
3. Add this line to the very bottom of the file:
```text
127.0.0.1 tomilingua.local

```


4. Save and close.

### Step 4: Launch the System in One Click

1. Open a terminal windows (PowerShell or Command Prompt) directly inside your main `tomilingua` folder.
2. Run the automated deployment orchestration command:
```bash
docker compose -f docker-compose.prod.yml up --build -d

```


3. Wait about 2–3 minutes. Docker will automatically download the database image, compile the production React bundles, set up Nginx proxy protocols, and bind the services. Once all containers display a green `Started` or `Done` status, the application is live!

### Step 5: Database Schema Provisioning & Admin Creation

Run the database migrations to build the tables and create an administrative account for evaluation:

```bash
# 1. Apply relational database tables
docker compose -f docker-compose.prod.yml exec backend python manage.py migrate

# 2. Create an admin user to access the platform dashboard
docker compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser

```

Follow the terminal prompts to enter your administrator email and password.

---

##  Accessing the Platform

Open your web browser (Google Chrome, Microsoft Edge, Opera, etc.) and navigate to either:

*  Main Website: **`http://localhost:8085`** (or **`http://tomilingua.local:8085`**)
*  Teacher Administrative Panel: **`http://localhost:8085/admin/`**

###  Stopping the Platform

When you are done testing the system, you can release system RAM and resources by running this command in your project terminal:

```bash
docker compose -f docker-compose.prod.yml down

```

```
