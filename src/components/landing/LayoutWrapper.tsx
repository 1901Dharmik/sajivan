// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/landing/Header";
import Footer from "@/components/Footer";
import DockMenu from "@/components/dock-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [showDockMenu, setShowDockMenu] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show dock menu if not near bottom (last 200px)
      setShowDockMenu(documentHeight - (scrollPosition + windowHeight) > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={`min-h-screen ${isAdminRoute ? 'mt-0' : 'mt-14'}`}>{children}</main>
      <AnimatePresence>
        {!isAdminRoute && showDockMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 p-4"
          >
            <DockMenu />
          </motion.div>
        )}
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
    </>
  );
}