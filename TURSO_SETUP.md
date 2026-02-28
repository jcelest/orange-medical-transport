# Turso Database Setup

Use Turso for a free, persistent cloud database (required for Vercel deployment).

## Step 1: Install Turso CLI

**Windows (PowerShell):**
```powershell
irm get.turso.tech/install.ps1 | iex
```

**Mac/Linux:**
```bash
curl -sSfL https://get.turso.tech/install.sh | sh
```

Or sign up at [turso.tech](https://turso.tech) and use the web dashboard.

## Step 2: Sign in

```bash
turso auth login
```

## Step 3: Create your database

```bash
turso db create orange-medical-transport
```

## Step 4: Get your credentials

**Database URL:**
```bash
turso db show orange-medical-transport --url
```
Copy the output (looks like `libsql://orange-medical-transport-username.turso.io`)

**Auth token:**
```bash
turso db tokens create orange-medical-transport
```
Copy the token (keep it secret!).

## Step 5: Create the tables

```bash
turso db shell orange-medical-transport < scripts/turso-setup.sql
```

## Step 6: Add to your environment

Add to `.env` (local) or your hosting provider (Vercel, etc.):

```
TURSO_DATABASE_URL=libsql://orange-medical-transport-xxx.turso.io
TURSO_AUTH_TOKEN=your-token-here
```

## Step 7: Create tables (run schema)

**Option A – Prisma (recommended):** Set `DATABASE_URL` to your Turso URL with token, then run:

```
DATABASE_URL="libsql://your-db-username.turso.io?authToken=your-token" npm run db:push
```

**Option B – Turso CLI:** Run the setup SQL:

```bash
turso db shell orange-medical-transport < scripts/turso-setup.sql
```

**Option C – Turso web dashboard:** Open your database at [turso.tech](https://turso.tech) → SQL editor → paste and run `scripts/turso-setup.sql`.

## How it works

- **With Turso vars set:** App uses Turso (cloud)
- **Without Turso vars:** App uses local SQLite (`DATABASE_URL`)

You can develop locally with SQLite and deploy with Turso—no code changes needed.
