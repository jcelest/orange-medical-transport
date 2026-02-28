-- Run this in Turso to create your tables
-- Command: turso db shell orange-medical-transport < scripts/turso-setup.sql

CREATE TABLE IF NOT EXISTS "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientName" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "patientEmail" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "dropoffAddress" TEXT NOT NULL,
    "appointmentDate" TEXT NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "specialNeeds" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
