"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface NavItemProps {
  label: string
  href: string
  children?: React.ReactNode
}

export function NavItem({ label, href, children }: NavItemProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div className="static" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <a
        href={href}
        className="relative inline-block px-4 py-4 text-sm font-medium text-gray-700 transition-colors hover:text-black"
      >
        {label}
        {isHovered && (
         <motion.div
         className="absolute bottom-0 left-1/2 h-0.5 bg-black"
         initial={{ width: 0, x: "-50%" }}
         animate={{ width: "100%", x: "-50%" }}
         transition={{ duration: 0.2, ease: "easeInOut" }}
       />
        )}
      </a>
      {children && (
        <motion.div
          className="fixed top-50 left-0 right-0 z-50 overflow-hidden bg-white shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            visibility: isHovered ? "visible" : "hidden",
            top: "50px",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        </motion.div>
      )}
    </div>
  )
}

