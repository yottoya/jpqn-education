"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import Link from "next/link";
import { useWhichScreen } from "@/hooks/useWhichScreen";
import { RainbowButton } from "./ui/rainbow-button";

interface HeaderProps {
  onNavigate?: (id: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.assign(`/#${id}`);
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "mission", label: "Mission" },
    { id: "booking", label: "Book Now" },
  ];

  const device = useWhichScreen();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "mx-0 mt-0 rounded-none bg-primary/95 backdrop-blur-md shadow-lg"
          : "mx-4 mt-4 rounded-xl bg-primary backdrop-blur-sm shadow-md md:mx-8 md:mt-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div>
            <Link href={"/"} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-primary-foreground md:text-xl">
                JPQN Education
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <RainbowButton
              variant="outline"
              onClick={() => handleNavigate("booking")}
            >
              Improve Grades Now
            </RainbowButton>
          </div>

          {/*Dark Mode & Mobile Menu */}
          <div className="flex justify-center items-center gap-4">
            {device === "mobile" ? (
              <AnimatedThemeToggler className="text-primary-foreground" />
            ) : (
              <></>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary-foreground"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-primary-foreground/10 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="text-left text-sm font-medium text-primary-foreground/80"
                >
                  {item.label}
                </button>
              ))}
              <RainbowButton
                variant="outline"
                onClick={() => handleNavigate("booking")}
              >
                Improve Grades Now
              </RainbowButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
