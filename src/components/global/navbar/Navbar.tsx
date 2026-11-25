"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {PrimaryButton} from "@/components/common/Buttons";
import {ChevronDownIcon} from "lucide-react";
import {APP_ROUTES, NAV_ITEMS, type NavItem} from "@/constants/navigation.constants";

const navItems: NavItem[] = NAV_ITEMS;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleSection = (label: string) =>
    setOpenSections((prev) => ({...prev, [label]: !prev[label]}));

  return (
    <nav className="fixed bg-[#F7F5F2] top-0 left-0 w-full py-4.5 xl:py-1.5  z-100 border-b border-[#2D2A260D]">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-wrap flex-row justify-between items-center">
        {/* Logo */}
        <div className="shrink-0">
          <Link href={APP_ROUTES.HOME}>
            <Image
              src="/assets/logos/logo-dark.png"
              alt="Yuva Unstoppable"
              width={125}
              height={65}
              priority
              fetchPriority="high"
              className="w-13 h-7 xl:w-31.25 xl:h-16.25 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex shrink-0 flex-wrap flex-row gap-9 items-center justify-center">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative group self-stretch flex items-center"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:cursor-pointer flex flex-row items-center gap-1 typo-body5 font-semibold text-[#2D2A26] hover:text-primary-red transition-colors duration-200"
                  >
                    {item.label}
                    <ChevronDownIcon className="size-4 group-hover:rotate-180 transition-transform duration-300"/>
                  </Link>
                ) : (
                  <button
                    className="hover:cursor-pointer flex flex-row items-center gap-1 typo-body5 font-semibold text-[#2D2A26] hover:text-primary-red transition-colors duration-200">
                    {item.label}
                    <ChevronDownIcon className="size-4 group-hover:rotate-180 transition-transform duration-300"/>
                  </button>
                )}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-11.5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div
                    className="bg-[#FDFBF7] border border-[#2D2A261A] shadow-xl rounded-2xl overflow-hidden flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="px-5 py-2.5 typo-body5 text-[#2D2A26] hover:bg-[#F4EDE0] hover:text-primary-red transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="hover:cursor-pointer typo-body5 font-semibold text-[#2D2A26] hover:text-primary-red transition-colors duration-200"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        {/* Action Button */}
        <div className="hidden xl:block shrink-0">
          <PrimaryButton
            hasHoverEffect={true}
            label="Support Our Mission"
            href={APP_ROUTES.DONATE}
            textClassName="typo-body5 font-semibold!"
            btnClassName="py-2.5 px-5.5"
          />
        </div>

        {/* Mobile Hamburger Button (morphs into a cross) */}
        <div className="shrink-0 xl:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="relative flex size-7 items-center justify-center"
          >
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-[#2D2A26] transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-[#2D2A26] transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-[#2D2A26] transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay (sits below the nav so logo + toggle stay visible) */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-17.25 inset-x-0 bottom-0 bg-black/40 z-150 xl:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16.25 right-0 bottom-0 w-full max-w-sm bg-[#F7F5F2] shadow-2xl z-200 p-6 flex flex-col gap-6 transition-transform duration-300 xl:hidden transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 overflow-y-auto flex-1 pr-2">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="flex flex-col border-b border-[#2D2A2626] pb-2"
              >
                <div className="flex justify-between items-center w-full">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex-1 text-left typo-body4 font-medium text-primary-red"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="flex-1 text-left typo-body4 font-medium text-primary-red"
                    >
                      {item.label}
                    </button>
                  )}
                  <button
                    onClick={() => toggleSection(item.label)}
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={!!openSections[item.label]}
                    className="p-1"
                  >
                    <ChevronDownIcon
                      className={`size-6 text-primary-red transition-transform duration-300 ${
                        openSections[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-3 pl-2 transition-all duration-300 overflow-hidden ${
                    openSections[item.label]
                      ? "mt-3 max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={closeMobileMenu}
                      className="typo-body5 text-[#030303D9] hover:text-primary-red font-medium transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onClick={closeMobileMenu}
                className="typo-body4 font-medium text-primary-red border-b border-[#2D2A2626] pb-3 hover:opacity-80 transition-opacity"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="pt-2">
          <PrimaryButton
            label="Donate"
            href={APP_ROUTES.DONATE}
            textClassName="typo-body5 font-semibold! w-full text-center block"
            btnClassName="py-3 px-6 w-full text-center"
            onClickAction={closeMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
