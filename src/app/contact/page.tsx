import { Suspense } from "react"
import ContactForm from "./components/contact-form"
import ContactInfo from "./components/contact-info"
import ContactFormSkeleton from "./components/contact-form-skeleton"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Contact Us - Sajivan Ayurveda",
  description: "Get in touch with Sajivan Ayurveda for any questions, feedback, or support.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Contact Us" description="We'd love to hear from you" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Suspense fallback={<ContactFormSkeleton />}>
              <ContactForm />
            </Suspense>

            <ContactInfo />
          </div>
        </div>
      </main>
    </div>
  )
}

