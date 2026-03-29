"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { RainbowButton } from "./ui/rainbow-button";
import { lpNavItems } from "@/data/constants";
import { handleNavigate } from "@/lib/scroll-to-element";
import Link from "next/link";

type HeaderVariant = "dark" | "light" | "gradient";

interface HeaderProps {
  variant?: HeaderVariant;
}

export default function Header({ variant = "dark" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navToElement = (id: string) => {
    handleNavigate(id);
    setMobileMenuOpen(false);
  };

  const isGradient = variant === "gradient";
  const isLight = variant === "light";

  // Semi-transparent backgrounds (never fully solid)
  const bgClass = isGradient
    ? "bg-[conic-gradient(at_center,#ff0080,#00ff80,#0080ff,#ff8000,#ff0080,#8000ff)] bg-[length:500%_500%] animate-swirl"
    : isLight
      ? "bg-white/30"
      : "bg-zinc/70"; // semi-transparent dark

  const glassClass = isGradient
    ? "bg-white/10 backdrop-blur-lg"
    : isLight
      ? "bg-white/70 backdrop-blur-lg shadow-sm"
      : "bg-zinc/70 backdrop-blur-lg";

  const textColor = isLight ? "text-zinc-900" : "text-white";
  const mutedText = isLight ? "text-zinc-600" : "text-white/80";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out overflow-hidden
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled
            ? "mx-0 mt-0 rounded-none shadow-xl"
            : "mx-4 mt-4 rounded-2xl shadow-lg md:mx-8 md:mt-6"
        }`}
    >
      {/* Animated / Colored Background */}
      <div className={`absolute inset-0 ${bgClass}`} />

      {/* Glass Layer */}
      <div className={`relative ${glassClass}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${isLight ? "bg-zinc-900" : "bg-white/10"}`}
                >
                  <GraduationCap
                    className={`h-5 w-5 ${isLight ? "text-white" : "text-white"}`}
                  />
                </div>
                <span
                  className={`text-lg font-semibold md:text-xl ${textColor}`}
                >
                  JPQN Education
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {lpNavItems.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => navToElement(item.id)}
                  className={`text-sm font-medium transition-colors hover:opacity-100 ${mutedText}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <RainbowButton
                variant={isLight ? "default" : "outline"}
                onClick={() => navToElement("booking")}
              >
                Improve Grades Now
              </RainbowButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden ${textColor}`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div
              className={`border-t py-4 md:hidden ${isLight ? "border-zinc-200" : "border-white/20"}`}
            >
              <nav className="flex flex-col gap-4">
                {lpNavItems.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navToElement(item.id)}
                    className={`text-left text-sm font-medium ${mutedText}`}
                  >
                    {item.label}
                  </button>
                ))}
                <RainbowButton
                  variant={isLight ? "default" : "outline"}
                  onClick={() => navToElement("booking")}
                >
                  Improve Grades Now
                </RainbowButton>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
