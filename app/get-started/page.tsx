// import { Inspiration } from "next/font/google";
import CalendlyWidget from "../components/calendly";
// import Footer from "../components/footer";
import Main from "../js/main";
import type { Metadata } from "next";
import InspirationalQuote from "../components/quote";

export const metadata: Metadata = {
  title: "Get Started | Precise Wolf Digital",
  description:
    "Schedule a call to explore how Precise Wolf Digital can help grow your business through web design, SEO, and automation.",
  alternates: {
    canonical: "https://www.precisewolf.com/get-started",
  },
  openGraph: {
    title: "Get Started | Precise Wolf Digital",
    description:
      "Schedule a call to explore how Precise Wolf Digital can help grow your business through web design, SEO, and automation.",
    url: "https://www.precisewolf.com/get-started",
    type: "website",
  },
};

export default function GetStarted() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Get Started | Precise Wolf Digital",
            url: "https://www.precisewolf.com/get-started",
            description:
              "Schedule a call to explore how Precise Wolf Digital can help grow your business through web design, SEO, and automation.",
            mainEntity: {
              "@type": "Action",
              name: "Schedule a Consultation",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://calendly.com/latino-web-studio/web-check-in",
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
              result: {
                "@type": "Event",
                name: "Free Consultation Call",
              },
            },
            publisher: {
              "@type": "Organization",
              name: "Precise Wolf Digital",
              logo: {
                "@type": "ImageObject",
                url: "https://www.precisewolf.com/logo.png",
              },
            },
          }),
        }}
      />

      <Main />
      <section
        style={{ paddingTop: 150, paddingBottom: 100 }}
        className="relative"
        id="schedule"
      >
        <div className="container mx-auto px-4">
          <div
            className="flex justify-center -mx-4"
            style={{ flexWrap: "wrap" }}
          >
            <div className="px-4 text-center lg:w-1/2">
              <h1>How to Get Started</h1>
              <p>
                Schedule a time below to discuss ideas to help you save time
                while growing your business.
              </p>
            </div>
            <div className="px-4 text-center w-full" id="calendar">
              {/* <!-- Calendly inline widget begin --> */}
              <CalendlyWidget />
              {/* <!-- Calendly inline widget end --> */}
            </div>
          </div>
        </div>
      </section>

      <InspirationalQuote />
    </>
  );
}
