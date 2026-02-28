"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SERVICE_TYPES = [
  { value: "ambulatory", label: "Ambulatory" },
  { value: "wheelchair", label: "Wheelchair" },
  { value: "stretcher", label: "Stretcher" },
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
    serviceType: "ambulatory",
    specialNeeds: "",
    notes: "",
  });

  useEffect(() => {
    const service = searchParams.get("service");
    if (service && ["ambulatory", "wheelchair", "stretcher"].includes(service)) {
      setFormData((prev) => ({ ...prev, serviceType: service }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
            <svg
              className="h-8 w-8 text-[#228b22]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-zinc-900">
            Booking Request Received!
          </h2>
          <p className="mt-4 text-zinc-600">
            Thank you for choosing Orange Medical Transport. We&apos;ve received your
            request and will contact you shortly to confirm your appointment.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {emailSent
              ? `A confirmation has been sent to ${formData.patientEmail}. `
              : "We have received your request. "}
            If you have questions, call us at{" "}
            <a href="tel:407-429-1209" className="font-medium text-orange-500">
              407-429-1209
            </a>
            .
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
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
            Request a ride for yourself or a loved one. We&apos;ll confirm your
            appointment shortly.
          </p>
        </div>
      </section>

      <section id="booking-form" className="mx-auto max-w-2xl scroll-mt-20 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 md:p-8"
        >
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
          )}

          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Patient Name *
                </label>
                <input
                  type="text"
                  id="patientName"
                  required
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientName: e.target.value }))
                  }
                  className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="patientPhone"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="patientPhone"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={formData.patientPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, patientPhone: e.target.value }))
                  }
                  className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="patientEmail"
                className="block text-sm font-medium text-zinc-700"
              >
                Email *
              </label>
                <input
                  type="email"
                  id="patientEmail"
                  inputMode="email"
                  autoComplete="email"
                required
                value={formData.patientEmail}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))
                }
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="pickupAddress"
                className="block text-sm font-medium text-zinc-700"
              >
                Pickup Address *
              </label>
              <input
                type="text"
                id="pickupAddress"
                required
                value={formData.pickupAddress}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pickupAddress: e.target.value }))
                }
                placeholder="Street, City, ZIP"
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="dropoffAddress"
                className="block text-sm font-medium text-zinc-700"
              >
                Drop-off Address *
              </label>
              <input
                type="text"
                id="dropoffAddress"
                required
                value={formData.dropoffAddress}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dropoffAddress: e.target.value }))
                }
                placeholder="Street, City, ZIP"
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="appointmentDate"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Appointment Date *
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  required
                  value={formData.appointmentDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      appointmentDate: e.target.value,
                    }))
                  }
                  className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="appointmentTime"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Appointment Time *
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  required
                  value={formData.appointmentTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      appointmentTime: e.target.value,
                    }))
                  }
                  className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="serviceType"
                className="block text-sm font-medium text-zinc-700"
              >
                Service Type *
              </label>
              <select
                id="serviceType"
                required
                value={formData.serviceType}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, serviceType: e.target.value }))
                }
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="specialNeeds"
                className="block text-sm font-medium text-zinc-700"
              >
                Special Needs
              </label>
              <input
                type="text"
                id="specialNeeds"
                value={formData.specialNeeds}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, specialNeeds: e.target.value }))
                }
                placeholder="e.g., oxygen, mobility aid"
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-zinc-700"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Any other information we should know"
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[52px] w-full items-center justify-center rounded-lg bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50"
            >
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
