"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../navbar/Navbar";
import Preloader from "../preloader/Preloader";

import Footer from "../footer/Footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    try {
      const hasShown = sessionStorage.getItem("preloader_shown");
      if (hasShown !== "true") {
        setShowPreloader(true);
        document.body.style.overflow = "hidden";
      }
    } catch (e) {}
  }, []);

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem("preloader_shown", "true");
    } catch (e) {}
    document.body.style.overflow = "";
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && (
        <Preloader
          onComplete={handlePreloaderComplete}
        />
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
