import PageHeader from "@/components/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata = {
  title: "Refund & Cancellation Policy - Sajivan Ayurveda",
  description: "Refund and cancellation policy for Sajivan Ayurveda products and services.",
}

const refundContent = {
  title: "Refund & Cancellation Policy",
  lastUpdated: "March 15, 2023",
  sections: [
    {
      title: "1. Introduction",
      content:
        "At Sajivan Ayurveda, we strive to ensure your complete satisfaction with our products. This Refund and Cancellation Policy outlines our procedures for returns, refunds, and order cancellations.",
    },
    {
      title: "2. Order Cancellations",
      content:
        "You may cancel an order within 24 hours of placing it, provided the order has not yet been shipped. To cancel an order, please contact our customer service team at support@sajivanayurveda.com with your order number and a request for cancellation. If your order has already been shipped, you will need to follow our return procedure.",
    },
    {
      title: "3. Return Eligibility",
      content:
        "You may return most new, unopened items within 30 days of delivery for a full refund. We also accept returns of opened items within 14 days of delivery if the product is defective, damaged, or significantly different from what was described on our website. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.",
    },
    {
      title: "4. Non-Returnable Items",
      content:
        "Certain types of items cannot be returned, including: perishable goods such as food, flowers, or plants; personal care items that have been opened; custom products; downloadable software products; and gift cards. Additionally, any item not in its original condition, damaged, or missing parts for reasons not due to our error cannot be returned.",
    },
    {
      title: "5. Return Process",
      content:
        "To initiate a return, please email us at returns@sajivanayurveda.com with your order number and details about the item(s) you wish to return. We will provide you with specific instructions for returning the item(s), including the return shipping address. You will be responsible for paying the return shipping costs. We recommend using a trackable shipping service or purchasing shipping insurance for items of value.",
    },
    {
      title: "6. Refunds",
      content:
        "Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-14 business days. Please note that depending on your credit card company, it may take an additional 2-10 business days after your credit is applied for it to post to your account.",
    },
    {
      title: "7. Late or Missing Refunds",
      content:
        "If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund, please contact us at returns@sajivanayurveda.com.",
    },
    {
      title: "8. Exchanges",
      content:
        "We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at returns@sajivanayurveda.com and we will guide you through the process.",
    },
    {
      title: "9. Shipping",
      content:
        "You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.",
    },
    {
      title: "10. Changes to This Policy",
      content:
        "We reserve the right to modify this Refund and Cancellation Policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. We encourage you to check this page periodically for any changes.",
    },
    {
      title: "11. Contact Us",
      content:
        "If you have any questions about our Refund and Cancellation Policy, please contact us at returns@sajivanayurveda.com.",
    },
  ],
}

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Refund & Cancellation Policy"
        description="Our policies for returns, refunds, and order cancellations"
      />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <LegalContent content={refundContent} />
        </div>
      </main>
    </div>
  )
}

