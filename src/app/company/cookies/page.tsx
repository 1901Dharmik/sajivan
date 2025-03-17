import PageHeader from "@/components/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata = {
  title: "Cookie Policy - Sajivan Ayurveda",
  description: "Cookie policy for Sajivan Ayurveda website.",
}

const cookieContent = {
  title: "Cookie Policy",
  lastUpdated: "March 15, 2023",
  sections: [
    {
      title: "1. Introduction",
      content:
        "This Cookie Policy explains how Sajivan Ayurveda uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.",
    },
    {
      title: "2. What Are Cookies",
      content:
        "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Sajivan Ayurveda) are called 'first-party cookies'. Cookies set by parties other than the website owner are called 'third-party cookies'. Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).",
    },
    {
      title: "3. Why We Use Cookies",
      content:
        "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as 'essential' or 'strictly necessary' cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.",
    },
    {
      title: "4. Types of Cookies We Use",
      content:
        "Essential cookies: These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Performance cookies: These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable. Analytics cookies: These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you. Advertising cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.",
    },
    {
      title: "5. How to Control Cookies",
      content:
        "You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.",
    },
    {
      title: "6. Third-Party Cookies",
      content:
        "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on. These cookies may be placed by third-party service providers like Google Analytics, Facebook, and other advertising networks.",
    },
    {
      title: "7. What About Other Tracking Technologies",
      content:
        "Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called 'tracking pixels' or 'clear gifs'). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our website. This allows us, for example, to monitor the traffic patterns of users from one page within our website to another, to deliver or communicate with cookies, to understand whether you have come to our website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns.",
    },
    {
      title: "8. Changes to This Cookie Policy",
      content:
        "We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.",
    },
    {
      title: "9. Contact Us",
      content:
        "If you have any questions about our use of cookies or other technologies, please email us at privacy@sajivanayurveda.com.",
    },
  ],
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Cookie Policy" description="How we use cookies and similar technologies" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <LegalContent content={cookieContent} />
        </div>
      </main>
    </div>
  )
}

