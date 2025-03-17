import PageHeader from "@/components/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata = {
  title: "Privacy Policy - Sajivan Ayurveda",
  description: "Privacy policy for Sajivan Ayurveda website and services.",
}

const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "March 15, 2023",
  sections: [
    {
      title: "1. Introduction",
      content:
        "At Sajivan Ayurveda, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products. Please read this Privacy Policy carefully.",
    },
    {
      title: "2. Information We Collect",
      content:
        "We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us. The personal information we collect may include: name, email address, postal address, phone number, and payment information. We may also collect information automatically when you visit our website, including IP address, browser type, operating system, and browsing actions and patterns.",
    },
    {
      title: "3. How We Use Your Information",
      content:
        "We use the information we collect to: provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; develop new products, services, features, and functionality; communicate with you for customer service, updates, and marketing purposes; process transactions; find and prevent fraud; and for compliance with legal obligations.",
    },
    {
      title: "4. Disclosure of Your Information",
      content:
        "We may share your information with: our service providers and business partners who perform services on our behalf; advertisers and advertising networks; analytics and search engine providers; and law enforcement or government agencies when required by law. We do not sell your personal information to third parties.",
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.",
    },
    {
      title: "6. Data Security",
      content:
        "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.",
    },
    {
      title: "7. Your Data Protection Rights",
      content:
        "Depending on your location, you may have the following rights regarding your personal information: the right to access, update, or delete your information; the right to rectification; the right to object; the right of restriction; the right to data portability; and the right to withdraw consent. To exercise these rights, please contact us using the contact information provided below.",
    },
    {
      title: "8. Children's Privacy",
      content:
        "Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.",
    },
    {
      title: "9. Changes to This Privacy Policy",
      content:
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.",
    },
    {
      title: "10. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at privacy@sajivanayurveda.com.",
    },
  ],
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Privacy Policy" description="How we collect, use, and protect your information" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <LegalContent content={privacyContent} />
        </div>
      </main>
    </div>
  )
}

