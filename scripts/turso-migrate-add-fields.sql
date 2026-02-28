-- Add new booking fields (run once after schema update)
-- Run: npm run db:migrate:turso

ALTER TABLE "Booking" ADD COLUMN "serviceTimeWindow" TEXT;
ALTER TABLE "Booking" ADD COLUMN "weight" TEXT;
ALTER TABLE "Booking" ADD COLUMN "additionalPassengers" TEXT;
ALTER TABLE "Booking" ADD COLUMN "pickupDetails" TEXT;
ALTER TABLE "Booking" ADD COLUMN "pickupOtherDetails" TEXT;
ALTER TABLE "Booking" ADD COLUMN "dropoffDetails" TEXT;
ALTER TABLE "Booking" ADD COLUMN "dropoffOtherDetails" TEXT;
ALTER TABLE "Booking" ADD COLUMN "deadMiles" TEXT;
ALTER TABLE "Booking" ADD COLUMN "tripDistance" TEXT;
ALTER TABLE "Booking" ADD COLUMN "tripType" TEXT;
ALTER TABLE "Booking" ADD COLUMN "thirdAddress" TEXT;
ALTER TABLE "Booking" ADD COLUMN "legDistance" TEXT;
ALTER TABLE "Booking" ADD COLUMN "totalDistance" TEXT;
ALTER TABLE "Booking" ADD COLUMN "waitTime" TEXT;
ALTER TABLE "Booking" ADD COLUMN "rushFee" TEXT;
ALTER TABLE "Booking" ADD COLUMN "requestedByName" TEXT;
ALTER TABLE "Booking" ADD COLUMN "certificationAccepted" INTEGER;
