import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#228b22]/90 to-[#1a6b1a]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-4xl">About Us</h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:mt-4 sm:text-lg">
            Orange Medical Transport is dedicated to providing safe, reliable, and
            compassionate non-emergency medical transportation across Central Florida.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-zinc-200 px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Our Mission</h2>
              <p className="mt-4 text-zinc-600">
                We believe that everyone deserves access to quality healthcare, and
                transportation should never be a barrier. Our mission is to provide
                dignified, comfortable, and safe transportation for patients who need
                to get to medical appointments, dialysis treatments, hospital
                discharges, and other essential destinations.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Our Commitment</h2>
              <p className="mt-4 text-zinc-600">
                Every ride with Orange Medical Transport is handled with care. Our
                trained drivers and properly equipped vehicles ensure that you or your
                loved ones arrive at your destination safely and on time. We serve
                individuals with ambulatory needs, those requiring wheelchair
                accessibility, and patients who need stretcher transport.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-12 sm:mt-16 sm:pt-16">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Our Fleet</h2>
            <p className="mt-4 text-zinc-600">
              Our modern Ford Transit vans are equipped with wheelchair lifts and
              designed for safe, comfortable medical transport.
            </p>
            <div className="relative mt-4 aspect-video overflow-hidden rounded-xl sm:mt-6">
              <Image
                src="/images/ford-transit-wheelchair.png"
                alt="Orange Medical Transport wheelchair accessible van"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>

          <div className="mt-16 border-t border-zinc-200 pt-12 sm:pt-16">
            <h2 className="text-2xl font-bold text-zinc-900">What We Offer</h2>
            <ul className="mt-6 space-y-4 text-zinc-600">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                Transportation to doctor&apos;s appointments, dialysis, rehab centers, and more
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                Wheelchair-accessible vehicles with trained staff
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                Non-emergency stretcher transport for hospital discharges
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                Service throughout Central Florida
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                Affordable, reliable, and compassionate care
              </li>
            </ul>
          </div>

          <div className="mt-12 rounded-xl border-t border-zinc-200 bg-[#228b22]/5 p-6 pt-12 sm:mt-16 sm:p-8 sm:pt-16">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Get in Touch</h2>
            <p className="mt-4 text-zinc-600">
              Ready to book your ride or have questions? We&apos;re here to help.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/book"
                className="flex min-h-[48px] items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 active:bg-orange-700"
              >
                Book Transportation
              </Link>
              <Link
                href="/contact"
                className="flex min-h-[48px] items-center justify-center rounded-lg border-2 border-[#228b22] px-6 py-3 font-semibold text-[#228b22] hover:bg-[#228b22]/5 active:bg-[#228b22]/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
