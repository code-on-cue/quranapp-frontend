import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Pencarian" },
  { to: "/rekomendasi_doa", label: "Rekomendasi Doa" },
  { to: "/surah", label: "Daftar Surah" },
];

export default function Header() {
  const appName = import.meta.env.VITE_APP_NAME;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">{appName}</h1>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
          {navLinks.map((nav) => (
            <Link key={nav.to} to={nav.to}>
              {nav.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-gray-800">
          {navLinks.map((nav) => (
            <Link key={nav.to} to={nav.to} onClick={() => setMenuOpen(false)}>
              {nav.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
