import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-4 border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-6 divide-y divide-zinc-200 sm:gap-10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
          <div className="pt-6 first:pt-0 sm:col-span-2 sm:pt-0 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Orange Medical Transport"
                width={160}
                height={42}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm text-zinc-600">
              Providing safe and efficient non-emergency medical transport across Central Florida.
              Your comfort and care matter on every journey.
            </p>
          </div>
          <div className="space-y-4 pt-6 sm:space-y-0 sm:pt-0">
            <h3 className="font-semibold text-zinc-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="block min-h-[44px] py-1 text-sm text-zinc-600 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="block min-h-[44px] py-1 text-sm text-zinc-600 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block min-h-[44px] py-1 text-sm text-zinc-600 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="block min-h-[44px] py-1 text-sm text-zinc-600 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Book Transportation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="block min-h-[44px] py-1 text-sm text-zinc-600 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
          <div className="pt-6 sm:pt-0">
            <h3 className="font-semibold text-zinc-900">Service Areas</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/locations/orlando" className="block min-h-[44px] py-1 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Orlando
                </Link>
              </li>
              <li>
                <Link href="/locations/kissimmee" className="block min-h-[44px] py-1 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Kissimmee
                </Link>
              </li>
              <li>
                <Link href="/locations/winter-park" className="block min-h-[44px] py-1 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Winter Park
                </Link>
              </li>
              <li>
                <Link href="/locations/sanford" className="block min-h-[44px] py-1 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Sanford
                </Link>
              </li>
              <li>
                <Link href="/locations/clermont" className="block min-h-[44px] py-1 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  Clermont
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 pt-6 sm:space-y-0 sm:pt-0">
            <h3 className="font-semibold text-zinc-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>
                <a href="tel:407-429-1209" className="block min-h-[44px] py-1 hover:text-[#228b22] sm:min-h-0 sm:py-0">
                  407-429-1209
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium text-zinc-900">Our Location</span>
                <span>2554 W Colonial Dr, Suite B<br />Orlando, FL 32804</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium text-zinc-900">Working Hours</span>
                <span>Mon–Fri: 6am – 9pm<br />Sat: 7am – 8pm<br />Sun: Closed</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Orange Medical Transport. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
