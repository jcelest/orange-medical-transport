import nodemailer from "nodemailer";
import twilio from "twilio";

export interface BookingData {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  pickupAddress: string;
  dropoffAddress: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  specialNeeds?: string;
  notes?: string;
}

const serviceTypeLabels: Record<string, string> = {
  ambulatory: "Ambulatory",
  wheelchair: "Wheelchair",
  stretcher: "Stretcher",
};

export async function sendBookingEmail(booking: BookingData, toEmail: string) {
  const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;
  if (!hasSmtp) {
    console.log("[Email] Skipped - SMTP not configured. Booking details:", booking);
    return { success: false, skipped: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>New Medical Transport Booking</h2>
      <p><strong>Patient Name:</strong> ${booking.patientName}</p>
      <p><strong>Phone:</strong> ${booking.patientPhone}</p>
      <p><strong>Email:</strong> ${booking.patientEmail}</p>
      <p><strong>Pickup:</strong> ${booking.pickupAddress}</p>
      <p><strong>Dropoff:</strong> ${booking.dropoffAddress}</p>
      <p><strong>Date:</strong> ${booking.appointmentDate}</p>
      <p><strong>Time:</strong> ${booking.appointmentTime}</p>
      <p><strong>Service Type:</strong> ${serviceTypeLabels[booking.serviceType] || booking.serviceType}</p>
      ${booking.specialNeeds ? `<p><strong>Special Needs:</strong> ${booking.specialNeeds}</p>` : ""}
      ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: `New Booking: ${booking.patientName} - ${booking.appointmentDate} ${booking.appointmentTime}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[Email] Error:", error);
    return { success: false, error };
  }
}

/**
 * Free SMS via carrier email-to-SMS gateways.
 * Format: 10-digit-number@gateway (e.g., 4072491209@vtext.com for Verizon)
 * Common gateways: vtext.com (Verizon), txt.att.net (AT&T), tmomail.net (T-Mobile)
 */
async function sendSMSViaEmailGateway(
  booking: BookingData,
  gatewayEmail: string
): Promise<{ success: boolean; error?: unknown }> {
  const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;
  if (!hasSmtp) return { success: false };

  const body = `New booking: ${booking.patientName} - ${booking.appointmentDate} at ${booking.appointmentTime}. Pickup: ${booking.pickupAddress}. Call 407-249-1209 for details.`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: gatewayEmail,
      subject: body.slice(0, 50) + (body.length > 50 ? "..." : ""),
      text: body,
    });
    return { success: true };
  } catch (error) {
    console.error("[SMS via Email] Error:", error);
    return { success: false, error };
  }
}

export async function sendBookingSMS(booking: BookingData, toPhone: string) {
  const hasTwilio =
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER;

  // Option 1: Twilio (paid, but reliable)
  if (hasTwilio) {
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const body = `New booking: ${booking.patientName} - ${booking.appointmentDate} at ${booking.appointmentTime}. Pickup: ${booking.pickupAddress}. Call 407-249-1209 for details.`;

      const formattedPhone = toPhone.replace(/\D/g, "").startsWith("1")
        ? `+${toPhone.replace(/\D/g, "")}`
        : `+1${toPhone.replace(/\D/g, "")}`;

      await client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: formattedPhone,
      });
      return { success: true };
    } catch (error) {
      console.error("[SMS] Twilio Error:", error);
      return { success: false, error };
    }
  }

  // Option 2: Free - Email-to-SMS gateway (uses your Gmail SMTP)
  const gatewayEmail = process.env.SMS_EMAIL_GATEWAY;
  if (gatewayEmail) {
    return sendSMSViaEmailGateway(booking, gatewayEmail);
  }

  console.log("[SMS] Skipped - Configure TWILIO_* or SMS_EMAIL_GATEWAY. Booking details:", booking);
  return { success: false, skipped: true };
}

export async function sendBookingConfirmationToPatient(booking: BookingData) {
  const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;
  if (!hasSmtp) return { success: false, skipped: true };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>Your Booking Confirmation - Orange Medical Transport</h2>
      <p>Dear ${booking.patientName},</p>
      <p>We have received your transportation request. Here are the details:</p>
      <ul>
        <li><strong>Date:</strong> ${booking.appointmentDate}</li>
        <li><strong>Time:</strong> ${booking.appointmentTime}</li>
        <li><strong>Service:</strong> ${serviceTypeLabels[booking.serviceType] || booking.serviceType}</li>
        <li><strong>Pickup:</strong> ${booking.pickupAddress}</li>
        <li><strong>Dropoff:</strong> ${booking.dropoffAddress}</li>
      </ul>
      <p>We will contact you shortly to confirm. If you have questions, call us at <strong>407-249-1209</strong>.</p>
      <p>Thank you for choosing Orange Medical Transport!</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: booking.patientEmail,
      subject: `Booking Confirmation - ${booking.appointmentDate} ${booking.appointmentTime}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[Patient Email] Error:", error);
    return { success: false, error };
  }
}
