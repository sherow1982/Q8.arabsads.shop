"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import CartIcon from "./CartIcon";
import { STORE_NAME_AR } from "@/lib/constants";

const LOGO = "/logo.webp";
const LOGO_FALLBACK = "/logo.png";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(LOGO);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#e8e8e8] bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 lg:px-6">
        {/* Logo */}
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
          <img
            src={logoSrc}
            alt={STORE_NAME_AR}
            onError={() => setLogoSrc(LOGO_FALLBACK)}
            className="h-10 w-auto max-w-[180px] object-contain sm:h-12 md:h-14 md:max-w-[220px]"
          />
        </Link>

        {/* Search — Desktop */}
        <form onSubmit={onSearch} className="hidden flex-1 md:block">
          <div className="flex overflow-hidden rounded-lg border-2 border-[#e0e0e0] transition-colors focus-within:border-[#e53935]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="ابحث عن منتج، ماركة، فئة..."
              className="w-full px-4 py-2.5 text-sm outline-none placeholder:text-[#aaa]"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#e53935] px-5 text-sm font-bold text-white transition-colors hover:bg-[#c62828]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              بحث
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="mr-auto flex items-center gap-2 md:mr-0 md:gap-4">
          <Link
            href="/products"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-[#333] transition-colors hover:bg-[#f5f5f5] hover:text-[#e53935] md:flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#e53935]">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            المنتجات
          </Link>

          <button
            aria-label="المفضلة"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#555] transition-colors hover:bg-[#fff0f0] hover:text-[#e53935]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <CartIcon />

          <button
            aria-label="القائمة"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#555] transition-colors hover:bg-[#f5f5f5] md:hidden"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search / menu */}
      <div
        className={`border-t border-[#f0f0f0] transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <form onSubmit={onSearch} className="px-4 py-3">
          <div className="flex overflow-hidden rounded-lg border-2 border-[#e0e0e0] focus-within:border-[#e53935]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="ابحث عن منتج..."
              className="w-full px-3 py-2.5 text-sm outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#e53935] px-4 text-sm font-bold text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              بحث
            </button>
          </div>
        </form>
        <div className="flex gap-2 border-t border-[#f0f0f0] px-4 py-2">
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5 text-sm font-bold text-[#333] hover:text-[#e53935]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            جميع المنتجات
          </Link>
        </div>
      </div>
    </header>
  );
}
