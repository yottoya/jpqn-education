"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { businessAddress } from "@/data/constants";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "mission", label: "Mission" },
    { id: "booking", label: "Book Now" },
  ];

  return (
    <footer className="border-t border-x border-gray-300 rounded-t-2xl pt-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Changed to md:grid-cols-5 to accommodate all columns in one row */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-5">
          {/* Logo & Bio - Spans 2 columns */}
          <div className="flex flex-col items-center md:items-start md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">JPQN Education</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed text-center md:text-left">
              Adaptive, student-centered tutoring that nurtures curiosity and
              builds lasting confidence.
            </p>
          </div>

          {/* Navigate Column */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-sm text-foreground">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col items-center md:items-start gap-2 text-sm text-muted-foreground">
            <h4 className="font-semibold mb-2 text-sm text-foreground">
              Legal
            </h4>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-foreground transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Location Column - Now sits to the right of Legal */}
          <div className="flex flex-col items-center md:items-start gap-2 text-sm text-muted-foreground">
            <h4 className="font-semibold mb-2 text-sm text-foreground">
              Location
            </h4>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com"
              className="hover:text-foreground transition-colors text-center md:text-left"
            >
              {businessAddress}
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="mt-12 border-t border-border pb-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} JPQN Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
