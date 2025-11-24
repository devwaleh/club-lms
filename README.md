# Club LMS

A modern Learning Management System built with **Laravel** (API) and **Next.js** (Frontend).

## Tech Stack

-   **Backend**: Laravel 11, Laravel Sanctum (Auth), SQLite (Default Database)
-   **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
-   **Tooling**: Concurrently (for running both servers)

## Prerequisites

-   PHP 8.2 or higher
-   Composer
-   Node.js 18 or higher
-   NPM

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd club-lms
```

### 2. Backend Setup (API)

Navigate to the `api` directory and install dependencies:

```bash
cd api
composer install
```

Set up the environment file:

```bash
cp .env.example .env
php artisan key:generate
```

Configure the database (Default is SQLite):

```bash
# Create the SQLite database file
touch database/database.sqlite
```

Run migrations and seed the database:

```bash
php artisan migrate
php artisan db:seed --class=DefaultUserSeeder
```

> **Note**: The `DefaultUserSeeder` creates a test user (check the seeder file for credentials).

### 3. Frontend Setup (Web)

Navigate to the `web` directory and install dependencies:

```bash
cd ../web
npm install
```

Ensure your environment variables are set up. Usually, the defaults work for local development, but ensure `NEXT_PUBLIC_API_BASE_URL` points to your backend (e.g., `http://localhost:8000/api`).

## Running the Application

You can run both the backend and frontend simultaneously from the root directory:

```bash
# From the project root
npm run dev
```

-   **Frontend**: [http://localhost:3000](http://localhost:3000)
-   **Backend**: [http://localhost:8000](http://localhost:8000)

## Troubleshooting

### Login Fails with `net::ERR_FAILED`
-   Ensure the backend server is running.
-   Check CORS configuration in `api/config/cors.php`.
-   Ensure the frontend is sending requests to `/api/login` and not `/login`.

### CSRF Token Mismatch (419 Page Expired)
-   Check `api/.env` for duplicate `SESSION_DOMAIN` entries. Ensure `SESSION_DOMAIN=localhost` (or your domain) is set and `SESSION_DOMAIN=null` is **removed**.
-   **Restart the backend server** after changing `.env`.

### Hydration Mismatch Errors
-   This is often caused by browser extensions injecting code into the HTML.
-   We have suppressed this warning in `web/app/layout.tsx`, but try disabling extensions if issues persist.

### Server Component Error (useAuth)
-   Ensure components using hooks like `useAuth` have the `"use client";` directive at the top of the file.
