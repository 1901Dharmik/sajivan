"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Address",
      details: [
        "Sajivan Ayurveda Headquarters",
        "123 Ayurveda Way, Wellness District",
        "Mumbai, Maharashtra 400001, India",
      ],
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Phone",
      details: ["+91 123 456 7890 (Customer Service)", "+91 987 654 3210 (Wholesale Inquiries)"],
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email",
      details: ["info@sajivanayurveda.com", "support@sajivanayurveda.com"],
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM IST", "Saturday: 10:00 AM - 4:00 PM IST", "Sunday: Closed"],
    },
  ]

  const socialMedia = [
    { icon: <Facebook className="h-5 w-5" />, name: "Facebook", url: "https://facebook.com" },
    { icon: <Instagram className="h-5 w-5" />, name: "Instagram", url: "https://instagram.com" },
    { icon: <Twitter className="h-5 w-5" />, name: "Twitter", url: "https://twitter.com" },
    { icon: <Youtube className="h-5 w-5" />, name: "YouTube", url: "https://youtube.com" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 mt-1">{item.icon}</div>
              <div className="ml-4">
                <h3 className="font-semibold">{item.title}</h3>
                <div className="mt-1 space-y-1">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Our Location</h2>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {/* In a real application, you would embed a Google Map here */}
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <MapPin className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Map Placeholder</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

