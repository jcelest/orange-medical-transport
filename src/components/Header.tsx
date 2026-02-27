"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Orange Medical Transport"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition hover:text-[#228b22]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-600 transition hover:text-[#228b22]"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-zinc-600 transition hover:text-[#228b22]"
          >
            Contact Us
          </Link>
          <Link
            href="/book"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Book Transportation
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/book"
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white"
          >
            Book
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center justify-center rounded p-2 hover:bg-zinc-100">
        <svg className="h-6 w-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-1 flex min-w-[180px] flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg">
        <Link href="/" className="rounded px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-[#228b22]">
          Home
        </Link>
        <Link href="/about" className="rounded px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-[#228b22]">
          About Us
        </Link>
        <Link href="/contact" className="rounded px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-[#228b22]">
          Contact Us
        </Link>
        <Link href="/book" className="rounded bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-orange-600">
          Book Transportation
        </Link>
      </div>
    </details>
  );
}
