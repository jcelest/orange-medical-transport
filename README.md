# Orange Medical Transport

A modern, full-stack website for Orange Medical Transport with a patient booking portal, admin dashboard, and email/SMS notifications.

## Features

- **Home** – Hero, services (Ambulatory, Wheelchair, Stretcher), and why choose us
- **About Us** – Company mission and commitment
- **Contact Us** – Contact form and phone
- **Booking Portal** – Patients can submit transportation requests
- **Admin Portal** – View and manage bookings (password protected)
- **Notifications** – Email to company + optional SMS via Twilio when bookings are created
- **Patient Confirmation** – Email confirmation sent to patient after booking

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** (SQLite)
- **Nodemailer** (Email)
- **Twilio** (SMS, optional)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in:

```env
# Database (default works for development)
DATABASE_URL="file:./dev.db"

# Admin password for /admin portal
ADMIN_EMAIL=admin@orangemedicaltransport.com
ADMIN_PASSWORD=changeme123

# Email (Gmail example - use App Password, not regular password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=bookings@orangemedicaltransport.com

# SMS (Twilio - optional)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
COMPANY_PHONE=4072491209
```

### 3. Initialize database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Admin portal

Go to [http://localhost:3000/admin](http://localhost:3000/admin) and log in with `ADMIN_PASSWORD` from `.env`.

## Free notification setup

### Email (Gmail – free, 500/day)

1. Enable 2FA on your Google account: [myaccount.google.com/security](https://myaccount.google.com/security)
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. In `.env`: set `SMTP_USER` to your Gmail and `SMTP_PASS` to the App Password

### SMS (carrier email gateway – free)

Most US carriers support email-to-SMS. You send an email to `number@gateway` and it arrives as SMS. Uses your Gmail SMTP—no extra cost.

1. Find your carrier’s gateway (examples):
   - **Verizon:** `4072491209@vtext.com`
   - **AT&T:** `4072491209@txt.att.net`
   - **T-Mobile:** `4072491209@tmomail.net`
   - **Sprint:** `4072491209@messaging.sprintpcs.com`
2. In `.env`: set `SMS_EMAIL_GATEWAY` to that full address (replace with your number)

### SMS (Twilio – paid, optional)

If you prefer Twilio, set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`. When these are set, Twilio is used instead of the free gateway.

## Production

- Set a strong `ADMIN_PASSWORD`
- Use a production database (e.g., PostgreSQL) by changing `DATABASE_URL` and `provider` in `prisma/schema.prisma`
- Deploy to Vercel, Railway, or similar

## Project structure

```
src/
├── app/
│   ├── api/          # API routes (bookings, admin login)
│   ├── admin/        # Admin portal
│   ├── about/
│   ├── book/         # Patient booking
│   ├── contact/
│   └── page.tsx      # Home
├── components/       # Header, Footer
└── lib/              # Prisma client, notifications
```
