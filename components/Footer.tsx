"use client";

import { GraduationCap } from "lucide-react";

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
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">JPQN Education</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Adaptive, student-centered tutoring that nurtures curiosity and
            builds lasting confidence.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted-foreground items-center">
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

        <div>
          <h4 className="font-semibold mb-4 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>info@jpqneducation.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} JPQN Education. All rights reserved.</p>
      </div>
    </div>
  );
}
