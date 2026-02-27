import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
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
          <div>
            <h3 className="font-semibold text-zinc-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-600 hover:text-[#228b22]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-600 hover:text-[#228b22]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 hover:text-[#228b22]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-zinc-600 hover:text-[#228b22]">
                  Book Transportation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-zinc-600 hover:text-[#228b22]">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>
                <a href="tel:407-249-1209" className="hover:text-[#228b22]">
                  407-249-1209
                </a>
              </li>
              <li>Central Florida</li>
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
