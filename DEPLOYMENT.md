# Deployment Guide

## Add Your Domain (Vercel + Bluehost)

### 1. Add domain in Vercel

1. In Vercel: open your project → **Settings** → **Domains**.
2. Enter your domain (e.g. `orangemedicaltransport.com`) and click **Add**.
3. Vercel will show DNS records or nameserver instructions.

### 2. Point Bluehost to Vercel

**Option A – Custom nameservers (simplest)**

1. In Bluehost: **Domains** → **Manage** → **Nameservers**.
2. Choose **Custom Nameservers**.
3. Enter the two Vercel nameservers (e.g. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
4. Save.

**Option B – Keep Bluehost nameservers (DNS records)**

1. In Bluehost: **Domains** → **Manage** → **DNS Zone** (or **Advanced DNS**).
2. Add:
   - **A record:** `@` → `76.76.21.21`
   - **CNAME record:** `www` → `cname.vercel-dns.com`
3. Save.

### 3. Add env var in Vercel

In Vercel: **Settings** → **Environment Variables** → add:

- **Name:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://yourdomain.com` (your real domain, no trailing slash)

### 4. Wait for DNS

Propagation can take up to 48 hours (often 15–30 minutes). Vercel will issue an SSL certificate automatically once DNS is correct.

---

## Keep Vercel Warm (GitHub Actions)

A GitHub Actions workflow pings your site every 5 minutes to prevent cold starts on Vercel's serverless functions.

### Setup

1. Push this repo to GitHub (if not already).
2. In your GitHub repo: **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret**.
4. Name: `SITE_URL`  
   Value: `https://yourdomain.com` or `https://your-site.vercel.app` (no trailing slash).
5. Push any commit to trigger the workflow. It will run every 5 minutes automatically.

**Note:** GitHub Actions free tier allows 2,000 minutes/month for private repos. If you hit the limit, change the cron to `*/30 * * * *` (every 30 min) in `.github/workflows/keep-warm.yml`. Public repos have unlimited minutes.

The `/api/health` endpoint returns `{ ok: true }` and keeps your serverless functions warm.

---

## Alternative: UptimeRobot

If you prefer an external service:

1. Go to [uptimerobot.com](https://uptimerobot.com) and create a free account.
2. Add New Monitor → HTTP(s) → URL: `https://your-domain.vercel.app/api/health`
3. Set monitoring interval to 5 minutes.
