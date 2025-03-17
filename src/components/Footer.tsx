"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Droplets, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/products/new-arrivals" },
        { name: "Best Sellers", href: "/products/best-sellers" },
        { name: "Special Offers", href: "/products/special-offers" },
        { name: "Gift Cards", href: "/gift-cards" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Ayurvedic Principles", href: "/ayurvedic-principles" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping & Returns", href: "/shipping-returns" },
        { name: "Track Order", href: "/track-order" },
        { name: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ]

  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Droplets className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">
                Sajivan <span className="text-primary">Ayurveda</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Sajivan Ayurveda brings you the ancient wisdom of Ayurveda in its purest form. Our products are crafted
              with traditional methods and ethically sourced ingredients to provide authentic Ayurvedic wellness
              solutions.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="bg-primary/10 text-primary p-2 rounded-full"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="bg-primary/10 text-primary p-2 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="bg-primary/10 text-primary p-2 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="bg-primary/10 text-primary p-2 rounded-full"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </motion.a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-muted">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-3" />
            <span className="text-sm">123 Ayurveda Way, Wellness District, Mumbai, India</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-3" />
            <span className="text-sm">+91 123 456 7890</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary mr-3" />
            <span className="text-sm">info@sajivanayurveda.com</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-muted text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sajivan Ayurveda. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/company/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/company/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/company/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link href="/company/refund" className="hover:text-primary transition-colors">
              Refund & Cancellation Policy
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

