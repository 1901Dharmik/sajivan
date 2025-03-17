import PageHeader from "@/components/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata = {
  title: "Terms of Service - Sajivan Ayurveda",
  description: "Terms and conditions for using Sajivan Ayurveda products and services.",
}

const termsContent = {
  title: "Terms of Service",
  lastUpdated: "March 15, 2023",
  sections: [
    {
      title: "1. Introduction",
      content:
        "Welcome to Sajivan Ayurveda. These Terms of Service govern your use of our website, products, and services. By accessing our website or purchasing our products, you agree to these terms. Please read them carefully.",
    },
    {
      title: "2. Definitions",
      content:
        "Throughout these Terms of Service, 'we', 'us', and 'our' refer to Sajivan Ayurveda. 'You' refers to the user or viewer of our website or the purchaser of our products. 'Products' refers to all items available for purchase on our website. 'Website' refers to sajivanayurveda.com and all associated subdomains.",
    },
    {
      title: "3. Account Registration",
      content:
        "To access certain features of our website or to purchase products, you may need to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and complete.",
    },
    {
      title: "4. Products and Purchases",
      content:
        "All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We reserve the right to refuse any order you place with us. All product descriptions, including ingredients and benefits, are provided for informational purposes only and are not intended to diagnose, treat, cure, or prevent any disease.",
    },
    {
      title: "5. Shipping and Delivery",
      content:
        "We ship to addresses within the countries listed on our website. Delivery times are estimates and not guaranteed. We are not responsible for delays due to customs, international shipping, or other factors outside our control.",
    },
    {
      title: "6. Returns and Refunds",
      content: "Please refer to our Refund and Cancellation Policy for information about returns and refunds.",
    },
    {
      title: "7. Intellectual Property",
      content:
        "All content on our website, including text, graphics, logos, images, and software, is the property of Sajivan Ayurveda and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content from our website without our express written permission.",
    },
    {
      title: "8. User Conduct",
      content:
        "You agree not to use our website for any unlawful purpose or in any way that could damage, disable, overburden, or impair our website or interfere with any other party's use of our website. You agree not to attempt to gain unauthorized access to any part of our website, other accounts, or computer systems or networks connected to our website.",
    },
    {
      title: "9. Disclaimer of Warranties",
      content:
        "Our website and products are provided 'as is' without any warranties, expressed or implied. We do not warrant that our website will be uninterrupted or error-free, that defects will be corrected, or that our website or the server that makes it available are free of viruses or other harmful components.",
    },
    {
      title: "10. Limitation of Liability",
      content:
        "In no event shall Sajivan Ayurveda be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our website or products, even if we have been advised of the possibility of such damages.",
    },
    {
      title: "11. Indemnification",
      content:
        "You agree to indemnify, defend, and hold harmless Sajivan Ayurveda, its officers, directors, employees, agents, and suppliers from and against all losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from any violation of these Terms of Service or any activity related to your account.",
    },
    {
      title: "12. Changes to Terms",
      content:
        "We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued use of our website after any changes to these Terms of Service constitutes your acceptance of the new Terms of Service.",
    },
    {
      title: "13. Governing Law",
      content:
        "These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
    },
    {
      title: "14. Contact Information",
      content:
        "If you have any questions about these Terms of Service, please contact us at legal@sajivanayurveda.com.",
    },
  ],
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Terms of Service" description="Please read our terms and conditions carefully" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <LegalContent content={termsContent} />
        </div>
      </main>
    </div>
  )
}

