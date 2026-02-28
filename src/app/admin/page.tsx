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
}

const SERVICE_LABELS: Record<string, string> = {
  ambulatory: "Ambulatory",
  wheelchair: "Wheelchair",
  stretcher: "Stretcher",
};

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
        <>
          {/* Mobile/Tablet: Card layout */}
          <div className="mt-6 space-y-4 md:hidden">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-zinc-900">{booking.patientName}</p>
                    <p className="text-sm text-zinc-500">{booking.patientPhone}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                </div>
                <p className="mt-2 text-sm text-zinc-600">
                  {booking.appointmentDate} at {booking.appointmentTime} · {SERVICE_LABELS[booking.serviceType] || booking.serviceType}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {booking.pickupAddress} → {booking.dropoffAddress}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        className="min-h-[44px] rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white active:bg-green-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        className="min-h-[44px] rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white active:bg-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(booking.id, "completed")}
                      className="min-h-[44px] rounded-lg bg-zinc-600 px-4 py-2 text-sm font-medium text-white active:bg-zinc-700"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => removeBooking(booking.id)}
                    className="min-h-[44px] rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-600 active:bg-zinc-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="mt-8 hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
              <thead>
                <tr className="bg-zinc-50">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-500">
                    Patient
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-500">
                    Date / Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-500">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-500">
                    Pickup → Dropoff
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-zinc-900">
                          {booking.patientName}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {booking.patientPhone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600">
                      {booking.appointmentDate} at {booking.appointmentTime}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {SERVICE_LABELS[booking.serviceType] || booking.serviceType}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-sm text-zinc-600">
                      <span className="truncate">{booking.pickupAddress}</span>
                      <br />
                      <span className="truncate">→ {booking.dropoffAddress}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(booking.id, "confirmed")}
                              className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateStatus(booking.id, "cancelled")}
                              className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(booking.id, "completed")}
                            className="rounded bg-zinc-600 px-2 py-1 text-xs text-white hover:bg-zinc-700"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => removeBooking(booking.id)}
                          className="rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
                          title="Remove appointment"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
