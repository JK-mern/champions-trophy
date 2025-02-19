"use client";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8" />
            <span className="font-bold text-xl">Cricket Dashboard</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>

            <Link
              href="/players"
              className="hover:text-blue-200 transition-colors"
            >
              Players
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/players"
              className="block hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Players
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
