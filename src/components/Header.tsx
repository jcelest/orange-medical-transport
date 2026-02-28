"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-14 min-h-[44px] max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Orange Medical Transport home">
          <Image
            src="/images/logo.png"
            alt=""
            width={180}
            height={48}
            className="h-7 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Main navigation">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex min-h-[44px] items-center py-2 text-sm font-medium text-zinc-600 transition hover:text-[#228b22]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex min-h-[44px] items-center py-2 text-sm font-medium text-zinc-600 transition hover:text-[#228b22]"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="flex min-h-[44px] items-center py-2 text-sm font-medium text-zinc-600 transition hover:text-[#228b22]"
            >
              Contact Us
            </Link>
          </div>
          <Link
            href="/book"
            className="ml-3 flex min-h-[44px] items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 active:bg-orange-700"
          >
            Book Transportation
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/book"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white active:bg-orange-700"
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
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 active:bg-zinc-200"
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 top-14 z-40 bg-black/40 sm:top-16" aria-hidden onClick={() => setOpen(false)} />
          <nav
            className="fixed right-0 top-14 z-50 flex h-[calc(100dvh-3.5rem)] w-full max-w-sm flex-col border-l border-zinc-200 bg-white shadow-2xl sm:top-16 sm:h-[calc(100dvh-4rem)]"
            aria-label="Mobile menu"
          >
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              <Link href="/" onClick={() => setOpen(false)} className="min-h-[48px] flex items-center rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100">
                Home
              </Link>
              <Link href="/about" onClick={() => setOpen(false)} className="min-h-[48px] flex items-center rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100">
                About Us
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="min-h-[48px] flex items-center rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100">
                Contact Us
              </Link>
              <div className="my-2 border-t border-zinc-200" />
              <Link href="/book" onClick={() => setOpen(false)} className="min-h-[52px] flex items-center justify-center rounded-lg bg-orange-500 px-4 py-3 text-base font-semibold text-white hover:bg-orange-600 active:bg-orange-700">
                Book Transportation
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
