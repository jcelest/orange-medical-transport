"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to send message");
      }
    } catch {
      alert("Failed to send message");
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-forest/90 to-forest-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Have questions or need a quote? We&apos;re here to help. Reach out by phone,
            or send us a message.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Get in Touch</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-zinc-900">Phone</h3>
                <a
                  href="tel:407-249-1209"
                  className="mt-2 block text-orange-500 hover:text-orange-600"
                >
                  407-249-1209
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">Service Area</h3>
                <p className="mt-2 text-zinc-600">Central Florida</p>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">Ready to Book?</h3>
                <a
                  href="/book"
                  className="mt-2 inline-block font-medium text-orange-500 hover:text-orange-600"
                >
                  Book transportation online →
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900">Send a Message</h2>
            {submitted ? (
              <div className="mt-6 rounded-lg bg-forest/10 p-6 text-forest">
                <p className="font-medium">Thank you for your message!</p>
                <p className="mt-2 text-sm">
                  We&apos;ll get back to you as soon as possible. For immediate assistance,
                  please call us at 407-249-1209.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-forest focus:ring-forest"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-forest focus:ring-forest"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-forest focus:ring-forest"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-forest focus:ring-forest"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
