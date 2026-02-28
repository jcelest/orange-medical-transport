import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendBookingEmail,
  sendBookingSMS,
  sendBookingConfirmationToPatient,
} from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patientName,
      patientPhone,
      patientEmail,
      pickupAddress,
      dropoffAddress,
      appointmentDate,
      appointmentTime,
      serviceType,
      specialNeeds,
      notes,
      serviceTimeWindow,
      weight,
      additionalPassengers,
      pickupDetails,
      pickupOtherDetails,
      dropoffDetails,
      dropoffOtherDetails,
      deadMiles,
      tripDistance,
      tripType,
      thirdAddress,
      legDistance,
      totalDistance,
      waitTime,
      rushFee,
      requestedByName,
      certificationAccepted,
    } = body;

    if (
      !patientName ||
      !patientPhone ||
      !patientEmail ||
      !pickupAddress ||
      !dropoffAddress ||
      !appointmentDate ||
      !appointmentTime ||
      !serviceType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        patientName,
        patientPhone,
        patientEmail,
        pickupAddress,
        dropoffAddress,
        appointmentDate,
        appointmentTime,
        serviceType: serviceType || "1 Wheelchair",
        specialNeeds: specialNeeds || null,
        notes: notes || null,
        serviceTimeWindow: serviceTimeWindow || null,
        weight: weight || null,
        additionalPassengers: additionalPassengers || null,
        pickupDetails: pickupDetails || null,
        pickupOtherDetails: pickupOtherDetails || null,
        dropoffDetails: dropoffDetails || null,
        dropoffOtherDetails: dropoffOtherDetails || null,
        deadMiles: deadMiles || null,
        tripDistance: tripDistance || null,
        tripType: tripType || null,
        thirdAddress: thirdAddress || null,
        legDistance: legDistance || null,
        totalDistance: totalDistance || null,
        waitTime: waitTime || null,
        rushFee: rushFee || null,
        requestedByName: requestedByName || null,
        certificationAccepted: certificationAccepted ?? null,
      },
    });

    const bookingData = {
      patientName,
      patientPhone,
      patientEmail,
      pickupAddress,
      dropoffAddress,
      appointmentDate,
      appointmentTime,
      serviceType,
      specialNeeds,
      notes,
      serviceTimeWindow,
      weight,
      additionalPassengers,
      pickupDetails,
      pickupOtherDetails,
      dropoffDetails,
      dropoffOtherDetails,
      deadMiles,
      tripDistance,
      tripType,
      thirdAddress,
      legDistance,
      totalDistance,
      waitTime,
      rushFee,
      requestedByName,
    };

    // Send notifications (must await so emails actually send before response)
    const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
    const companyPhone = process.env.COMPANY_PHONE || "4074291209";
    const hasSMS = process.env.TWILIO_ACCOUNT_SID || process.env.SMS_EMAIL_GATEWAY;
    const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;

    const notificationResults = await Promise.allSettled([
      notificationEmail ? sendBookingEmail(bookingData, notificationEmail) : Promise.resolve(),
      hasSMS ? sendBookingSMS(bookingData, companyPhone) : Promise.resolve(),
      sendBookingConfirmationToPatient(bookingData),
    ]).catch((err) => {
      console.error("Notification error:", err);
      return [];
    });

    // Log any failures for debugging
    notificationResults.forEach((result, i) => {
      if (result.status === "rejected") console.error("Notification failed:", result.reason);
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
      },
      emailSent: hasSmtp,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = authHeader?.replace("Bearer ", "");

  if (!adminPassword || providedPassword !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") || "desc";

    const bookings = await prisma.booking.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
