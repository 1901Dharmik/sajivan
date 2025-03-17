"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionProps,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { PropsWithChildren, useRef } from "react";
import { type ReactNode } from "react"

import { cn } from "@/lib/utils";

interface DockProps {
  children: ReactNode;
  direction?: "middle";
}

interface DockIconProps {
  children: ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const DockIcon = ({ children, label, href, isActive, onClick }: DockIconProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex flex-col items-center p-2 transition-all"
    >
      <div className={`flex items-center justify-center ${isActive ? "text-green-600" : "text-gray-600 hover:text-gray-900"}`}>
        {children}
      </div>
      <span className={`text-xs mt-1 ${isActive ? "text-green-600" : "text-gray-600"}`}>
        {label}
      </span>
    </a>
  );
};

const Dock = ({ children, direction = "middle" }: DockProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 bg-white border-t">
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};

export type { DockProps, DockIconProps };
export { Dock, DockIcon };
