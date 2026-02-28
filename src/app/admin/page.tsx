"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  pickupAddress: string;
  dropoffAddress: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  specialNeeds: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
  serviceTimeWindow?: string | null;
  weight?: string | null;
  additionalPassengers?: string | null;
  pickupDetails?: string | null;
  pickupOtherDetails?: string | null;
  dropoffDetails?: string | null;
  dropoffOtherDetails?: string | null;
  deadMiles?: string | null;
  tripDistance?: string | null;
  tripType?: string | null;
  thirdAddress?: string | null;
  legDistance?: string | null;
  totalDistance?: string | null;
  waitTime?: string | null;
  rushFee?: string | null;
  requestedByName?: string | null;
}

const SERVICE_LABELS: Record<string, string> = {
  ambulatory: "Ambulatory",
  wheelchair: "Wheelchair",
  stretcher: "Stretcher",
  "1 Wheelchair": "1 Wheelchair",
  "2 Wheelchairs": "2 Wheelchairs",
  Ambulatory: "Ambulatory",
  Stretcher: "Stretcher",
};

const SERVICE_TIME_LABELS: Record<string, string> = {
  business: "Business Hours (5:00 AM – 7:00 PM)",
  afterHours: "After Hours (7:00 PM – 9:00 PM)",
};

const TRIP_TYPE_LABELS: Record<string, string> = {
  oneWay: "One-way",
  roundtrip: "Roundtrip",
  threeLegs: "3 Legs Trip",
};

const ADDITIONAL_PASSENGER_LABELS: Record<string, string> = {
  "0": "No",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
};

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (value == null || value === "") return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
      <span className="min-w-[140px] text-sm font-medium text-zinc-500">{label}</span>
      <span className="text-sm text-zinc-900">{value}</span>
    </div>
  );
}

function BookingCard({ booking, onUpdateStatus, onRemove }: {
  booking: Booking;
  onUpdateStatus: (id: string, status: string) => void;
  onRemove: (id: string) => void;
}) {
  const serviceTimeLabel = booking.serviceTimeWindow ? SERVICE_TIME_LABELS[booking.serviceTimeWindow] || booking.serviceTimeWindow : null;
  const tripTypeLabel = booking.tripType ? TRIP_TYPE_LABELS[booking.tripType] || booking.tripType : null;
  const additionalLabel = booking.additionalPassengers ? ADDITIONAL_PASSENGER_LABELS[booking.additionalPassengers] ?? booking.additionalPassengers : null;

  const receivedAt = booking.createdAt
    ? new Date(booking.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 space-y-6">
          {receivedAt && (
            <p className="text-xs text-zinc-400">Received {receivedAt}</p>
          )}
          {/* Booking Information */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Booking Information</h3>
            <div className="space-y-2">
              <DetailRow label="Service Date" value={booking.appointmentDate} />
              <DetailRow label="Service Time" value={serviceTimeLabel} />
              <DetailRow label="Pickup Time" value={booking.appointmentTime} />
            </div>
          </section>

          {/* Service */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Service</h3>
            <div className="space-y-2">
              <DetailRow label="Service Type" value={SERVICE_LABELS[booking.serviceType] || booking.serviceType} />
              <DetailRow label="Passenger Name" value={booking.patientName} />
              <DetailRow label="Weight" value={booking.weight ? `${booking.weight} lbs` : null} />
              <DetailRow label="Additional Passengers" value={additionalLabel} />
            </div>
          </section>

          {/* Locations */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Locations</h3>
            <div className="space-y-2">
              <DetailRow label="Pickup Address" value={booking.pickupAddress} />
              <DetailRow label="Pickup Details" value={booking.pickupDetails} />
              <DetailRow label="Pickup Other" value={booking.pickupOtherDetails} />
              <DetailRow label="Drop-Off Address" value={booking.dropoffAddress} />
              <DetailRow label="Dropoff Details" value={booking.dropoffDetails} />
              <DetailRow label="Dropoff Other" value={booking.dropoffOtherDetails} />
            </div>
          </section>

          {/* Trip */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Trip</h3>
            <div className="space-y-2">
              <DetailRow label="Dead Miles" value={booking.deadMiles ? `${booking.deadMiles} miles` : null} />
              <DetailRow label="Trip Distance" value={booking.tripDistance ? `${booking.tripDistance} miles` : null} />
              <DetailRow label="Trip Type" value={tripTypeLabel} />
              <DetailRow label="3rd Address" value={booking.thirdAddress} />
              <DetailRow label="Leg Distance" value={booking.legDistance ? `${booking.legDistance} miles` : null} />
              <DetailRow label="Total Distance" value={booking.totalDistance ? `${booking.totalDistance} miles` : null} />
              <DetailRow label="Wait Time" value={booking.waitTime} />
              <DetailRow label="Rush Fee" value={booking.rushFee === "yes" ? "Yes" : booking.rushFee === "no" ? "No" : booking.rushFee} />
            </div>
          </section>

          {/* Contact */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Contact Information</h3>
            <div className="space-y-2">
              <DetailRow label="Requested By" value={booking.requestedByName} />
              <DetailRow label="Phone" value={booking.patientPhone} />
              <DetailRow label="Email" value={booking.patientEmail} />
            </div>
          </section>

          {/* Notes */}
          {(booking.notes || booking.specialNeeds) && (
            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Notes</h3>
              <div className="space-y-2">
                <DetailRow label="Special Needs" value={booking.specialNeeds} />
                <DetailRow label="Note" value={booking.notes} />
              </div>
            </section>
          )}
        </div>

        {/* Status & Actions */}
        <div className="flex shrink-0 flex-col gap-4 md:min-w-[180px]">
          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : booking.status === "completed"
                ? "bg-zinc-100 text-zinc-800"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {booking.status}
          </span>
          <div className="flex flex-wrap gap-2">
            {booking.status === "pending" && (
              <>
                <button
                  onClick={() => onUpdateStatus(booking.id, "confirmed")}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => onUpdateStatus(booking.id, "cancelled")}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Cancel
                </button>
              </>
            )}
            {booking.status === "confirmed" && (
              <button
                onClick={() => onUpdateStatus(booking.id, "completed")}
                className="rounded-lg bg-zinc-600 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => onRemove(booking.id)}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
      fetchBookings(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("admin_token", password);
        setAuthenticated(true);
        fetchBookings(password);
      } else {
        setLoginError(data.error || "Invalid password");
      }
    } catch {
      setLoginError("Login failed");
    }
  };

  const fetchBookings = async (authToken: string) => {
    setLoading(true);
    try {
      const url =
        filter === "all"
          ? "/api/bookings"
          : `/api/bookings?status=${filter}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        setAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated && token) {
      fetchBookings(token);
    }
  }, [filter, authenticated]);

  const updateStatus = async (id: string, status: string) => {
    const authToken = sessionStorage.getItem("admin_token");
    if (!authToken) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeBooking = async (id: string) => {
    if (!confirm("Remove this appointment? This cannot be undone.")) return;
    const authToken = sessionStorage.getItem("admin_token");
    if (!authToken) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Admin Login</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Enter the admin password to view bookings.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block min-h-[48px] w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}
            <button
              type="submit"
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 active:bg-orange-700"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full text-sm text-zinc-500 hover:text-zinc-700"
          >
            ← Back to site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Bookings</h1>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="min-h-[44px] rounded-lg border border-zinc-300 px-4 py-2 text-base"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleLogout}
            className="min-h-[44px] rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 active:bg-zinc-100"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mt-12 text-center text-zinc-500">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-12 text-center text-zinc-600">
          No bookings found.
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onUpdateStatus={updateStatus}
              onRemove={removeBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}
