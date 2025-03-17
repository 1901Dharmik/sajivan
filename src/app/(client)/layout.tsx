import React from "react";
import { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { DockDemo } from "@/components/DockDemo";
import DockMenu from "@/components/dock-menu";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Header />
      {/* <Navbar/> */}
      <main>{children}</main>
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 p-4">
        {/* <DockDemo /> */}
        <DockMenu />
      </div>
      <Footer />
    </React.Fragment>
  );
}
