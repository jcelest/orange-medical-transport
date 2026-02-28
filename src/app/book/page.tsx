"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SERVICE_TYPES = [
  { value: "1 Wheelchair", label: "1 Wheelchair" },
  { value: "2 Wheelchairs", label: "2 Wheelchairs" },
  { value: "Stretcher", label: "Stretcher" },
  { value: "Ambulatory", label: "Ambulatory" },
];

const PICKUP_TIMES_BUSINESS = [
  "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
];

const PICKUP_TIMES_AFTER = ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

const ADDITIONAL_PASSENGERS = [
  { value: "0", label: "No" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const LOCATION_DETAILS = ["Terminal", "Room", "Suite", "Apt"];

const WAIT_TIMES = [
  { value: "No", label: "No" },
  { value: "1hr", label: "1hr" },
  { value: "2hrs", label: "2hrs" },
  { value: "3hrs", label: "3hrs" },
  { value: "4hrs", label: "4hrs" },
];

function BookForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    pickupAddress: "",
    dropoffAddress: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "1 Wheelchair",
    specialNeeds: "",
    notes: "",
    serviceTimeWindow: "business" as "business" | "afterHours",
    weight: "",
    additionalPassengers: "0",
    pickupDetails: "",
    pickupOtherDetails: "",
    dropoffDetails: "",
    dropoffOtherDetails: "",
    deadMiles: "",
    tripDistance: "",
    tripType: "oneWay" as "oneWay" | "roundtrip" | "threeLegs",
    thirdAddress: "",
    legDistance: "",
    totalDistance: "",
    waitTime: "No",
    rushFee: "no",
    requestedByName: "",
    certificationAccepted: false,
  });

  const pickupTimeOptions = formData.serviceTimeWindow === "afterHours" ? PICKUP_TIMES_AFTER : PICKUP_TIMES_BUSINESS;
  const afterHoursFee = formData.serviceTimeWindow === "afterHours" ? 25 : 0;

  useEffect(() => {
    const service = searchParams.get("service");
    const map: Record<string, string> = {
      ambulatory: "Ambulatory",
      wheelchair: "1 Wheelchair",
      stretcher: "Stretcher",
      "1 Wheelchair": "1 Wheelchair",
      "2 Wheelchairs": "2 Wheelchairs",
      Stretcher: "Stretcher",
      Ambulatory: "Ambulatory",
    };
    if (service && map[service]) {
      setFormData((prev) => ({ ...prev, serviceType: map[service] }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certificationAccepted) {
      setError("Please accept the certification to continue.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          specialNeeds: formData.specialNeeds || undefined,
          notes: formData.notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setEmailSent(data.emailSent === true);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500";
  const labelClass = "block text-sm font-medium text-zinc-700";

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
            <svg className="h-8 w-8 text-[#228b22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-zinc-900">Booking Request Received!</h2>
          <p className="mt-4 text-zinc-600">
            Thank you for choosing Orange Medical Transport. We&apos;ve received your request and will contact you shortly to confirm your appointment.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {emailSent ? `A confirmation has been sent to ${formData.patientEmail}. ` : "We have received your request. "}
            If you have questions, call us at{" "}
            <a href="tel:407-429-1209" className="font-medium text-orange-500">407-429-1209</a>.
          </p>
          <Link href="/" className="mt-8 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#228b22]/90 to-[#1a6b1a]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
          <h1 className="text-xl font-bold text-white sm:text-4xl">Book Transportation</h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:mt-4 sm:text-lg">
            Request a ride for yourself or a loved one. We&apos;ll confirm your appointment shortly.
          </p>
        </div>
      </section>

      <section id="booking-form" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
          {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

          <h2 className="mb-6 text-xl font-bold text-zinc-900">Booking Information</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="appointmentDate" className={labelClass}>Service Date *</label>
              <input type="date" id="appointmentDate" required value={formData.appointmentDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, appointmentDate: e.target.value }))}
                className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Service Time *</label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
                <label className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition ${formData.serviceTimeWindow === "business" ? "border-[#228b22] bg-[#228b22]/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input type="radio" name="serviceTimeWindow" checked={formData.serviceTimeWindow === "business"}
                    onChange={() => setFormData((prev) => ({ ...prev, serviceTimeWindow: "business", appointmentTime: "" })) } className="h-4 w-4" />
                  <span className="text-zinc-700">Business Hours (5:00 AM – 7:00 PM) - $0.00</span>
                </label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition ${formData.serviceTimeWindow === "afterHours" ? "border-[#228b22] bg-[#228b22]/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input type="radio" name="serviceTimeWindow" checked={formData.serviceTimeWindow === "afterHours"}
                    onChange={() => setFormData((prev) => ({ ...prev, serviceTimeWindow: "afterHours", appointmentTime: "" }))} className="h-4 w-4" />
                  <span className="text-zinc-700">After Hours (7:00 PM – 9:00 PM) - $25.00</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="appointmentTime" className={labelClass}>Pickup Time *</label>
              <select id="appointmentTime" required value={formData.appointmentTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, appointmentTime: e.target.value }))}
                className={inputClass}>
                <option value="">Select time</option>
                {pickupTimeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="serviceType" className={labelClass}>Select Service *</label>
              <select id="serviceType" required value={formData.serviceType}
                onChange={(e) => setFormData((prev) => ({ ...prev, serviceType: e.target.value }))}
                className={inputClass}>
                <option value="">Select service from drop down</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="patientName" className={labelClass}>Passenger Name *</label>
              <input type="text" id="patientName" required placeholder="Full Name" value={formData.patientName}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientName: e.target.value }))}
                className={inputClass} />
            </div>

            <div>
              <label htmlFor="weight" className={labelClass}>Weight *</label>
              <input type="text" id="weight" required placeholder="lbs" value={formData.weight}
                onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                className={inputClass} />
              <p className="mt-1 text-xs text-zinc-500">Please enter weight in pounds</p>
            </div>

            <div>
              <label htmlFor="additionalPassengers" className={labelClass}>Additional Passenger(s) *</label>
              <select id="additionalPassengers" required value={formData.additionalPassengers}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalPassengers: e.target.value }))}
                className={inputClass}>
                {ADDITIONAL_PASSENGERS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pickupAddress" className={labelClass}>Pickup Location *</label>
              <input type="text" id="pickupAddress" required placeholder="Enter a location" value={formData.pickupAddress}
                onChange={(e) => setFormData((prev) => ({ ...prev, pickupAddress: e.target.value }))}
                className={inputClass} />
              <p className="mt-1 text-xs text-zinc-500">(Location&apos;s Address)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <select value={formData.pickupDetails} onChange={(e) => setFormData((prev) => ({ ...prev, pickupDetails: e.target.value }))}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm">
                  <option value="">Other details</option>
                  {LOCATION_DETAILS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input type="text" placeholder="If any" value={formData.pickupOtherDetails}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pickupOtherDetails: e.target.value }))}
                  className="min-w-[120px] rounded-lg border border-zinc-300 px-3 py-2 text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="dropoffAddress" className={labelClass}>Drop-Off Address *</label>
              <input type="text" id="dropoffAddress" required placeholder="Enter a location" value={formData.dropoffAddress}
                onChange={(e) => setFormData((prev) => ({ ...prev, dropoffAddress: e.target.value }))}
                className={inputClass} />
              <p className="mt-1 text-xs text-zinc-500">(Location&apos;s Address)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <select value={formData.dropoffDetails} onChange={(e) => setFormData((prev) => ({ ...prev, dropoffDetails: e.target.value }))}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm">
                  <option value="">Other details</option>
                  {LOCATION_DETAILS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input type="text" placeholder="If any" value={formData.dropoffOtherDetails}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dropoffOtherDetails: e.target.value }))}
                  className="min-w-[120px] rounded-lg border border-zinc-300 px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="deadMiles" className={labelClass}>Dead miles</label>
                <input type="text" id="deadMiles" placeholder="miles" value={formData.deadMiles}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadMiles: e.target.value }))}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="tripDistance" className={labelClass}>Trip Distance</label>
                <input type="text" id="tripDistance" placeholder="miles" value={formData.tripDistance}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tripDistance: e.target.value }))}
                  className={inputClass} />
                <p className="mt-1 text-xs text-zinc-500">Distance is showing in miles</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Trip *</label>
              <div className="mt-2 flex flex-wrap gap-4">
                <label className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 ${formData.tripType === "oneWay" ? "border-[#228b22] bg-[#228b22]/5" : "border-zinc-200"}`}>
                  <input type="radio" name="tripType" checked={formData.tripType === "oneWay"}
                    onChange={() => setFormData((prev) => ({ ...prev, tripType: "oneWay" }))} className="h-4 w-4" />
                  <span>One-way</span>
                </label>
                <label className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 ${formData.tripType === "roundtrip" ? "border-[#228b22] bg-[#228b22]/5" : "border-zinc-200"}`}>
                  <input type="radio" name="tripType" checked={formData.tripType === "roundtrip"}
                    onChange={() => setFormData((prev) => ({ ...prev, tripType: "roundtrip" }))} className="h-4 w-4" />
                  <span>Roundtrip</span>
                </label>
                <label className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 ${formData.tripType === "threeLegs" ? "border-[#228b22] bg-[#228b22]/5" : "border-zinc-200"}`}>
                  <input type="radio" name="tripType" checked={formData.tripType === "threeLegs"}
                    onChange={() => setFormData((prev) => ({ ...prev, tripType: "threeLegs" }))} className="h-4 w-4" />
                  <span>3 Legs Trip</span>
                </label>
              </div>
            </div>

            {formData.tripType === "threeLegs" && (
              <>
                <div>
                  <label htmlFor="thirdAddress" className={labelClass}>3rd Address *</label>
                  <input type="text" id="thirdAddress" required placeholder="Location's name or Address" value={formData.thirdAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, thirdAddress: e.target.value }))}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="legDistance" className={labelClass}>Leg Distance</label>
                  <input type="text" id="legDistance" placeholder="Drop-off - Drop-off (in miles)" value={formData.legDistance}
                    onChange={(e) => setFormData((prev) => ({ ...prev, legDistance: e.target.value }))}
                    className={inputClass} />
                </div>
              </>
            )}

            <div>
              <label htmlFor="totalDistance" className={labelClass}>Total Distance</label>
              <input type="text" id="totalDistance" placeholder="miles" value={formData.totalDistance}
                onChange={(e) => setFormData((prev) => ({ ...prev, totalDistance: e.target.value }))}
                className={inputClass} />
              <p className="mt-1 text-xs text-zinc-500">Distance is showing in miles</p>
            </div>

            <div>
              <label htmlFor="waitTime" className={labelClass}>Wait Time *</label>
              <select id="waitTime" required value={formData.waitTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, waitTime: e.target.value }))}
                className={inputClass}>
                {WAIT_TIMES.map((w) => (
                  <option key={w.value} value={w.value}>{w.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Rush fee</label>
              <div className="mt-2 flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="rushFee" checked={formData.rushFee === "yes"}
                    onChange={() => setFormData((prev) => ({ ...prev, rushFee: "yes" }))} className="h-4 w-4" />
                  <span>Yes</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="rushFee" checked={formData.rushFee === "no"}
                    onChange={() => setFormData((prev) => ({ ...prev, rushFee: "no" }))} className="h-4 w-4" />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>Note</label>
              <textarea id="notes" rows={3} placeholder="Any additional information" value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className={inputClass} />
            </div>

            <div className="border-t border-zinc-200 pt-6">
              <h3 className="mb-4 font-semibold text-zinc-900">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="requestedByName" className={labelClass}>Requested by *</label>
                  <input type="text" id="requestedByName" required placeholder="Name" value={formData.requestedByName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, requestedByName: e.target.value }))}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="patientPhone" className={labelClass}>Phone # *</label>
                  <input type="tel" id="patientPhone" required inputMode="tel" autoComplete="tel" value={formData.patientPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientPhone: e.target.value }))}
                    className={inputClass} />
                </div>
                <div>
                  <label htmlFor="patientEmail" className={labelClass}>Email *</label>
                  <input type="email" id="patientEmail" required inputMode="email" autoComplete="email" value={formData.patientEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))}
                    className={inputClass} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-700">After Hours fee: ${afterHoursFee}.00</p>
              <p className="mt-1 text-xs text-zinc-500">Trip cost will be confirmed upon booking.</p>
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" required checked={formData.certificationAccepted}
                  onChange={(e) => setFormData((prev) => ({ ...prev, certificationAccepted: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border-zinc-300" />
                <span className="text-sm text-zinc-700">
                  <strong>CERTIFICATION *</strong> By checking this box, I have carefully read the certification and I understand and agree to its terms.
                </span>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" disabled={loading}
              className="flex min-h-[52px] w-full items-center justify-center rounded-lg bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50">
              {loading ? "Submitting..." : "Submit Booking Request"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-16 text-center">Loading...</div>}>
      <BookForm />
    </Suspense>
  );
}
