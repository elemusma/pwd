import ContentBlock from "@/app/components/content-block";
import type { Metadata } from "next";
import CTA from "@/app/components/reusable/cta";
import GoogleReviews from "@/app/components/reusable/GoogleReviews";
import PricingTableStarter from "@/app/components/reusable/Pricing";

export const metadata: Metadata = {
  title:
    "Pricing - Web Design & SEO for Expert Witnesses | Precise Wolf Digital",
  description:
    "Transparent pricing for expert witness web design and monthly SEO services. Choose the plan that fits your goals and start attracting more attorney clients.",
  openGraph: {
    title:
      "Pricing - Web Design & SEO for Expert Witnesses | Precise Wolf Digital",
    description:
      "Transparent pricing for expert witness web design and monthly SEO services. Choose the plan that fits your goals and start attracting more attorney clients.",
    url: "https://www.precisewolf.com/pricing",
    type: "website",
    images: [
      {
        url: "https://www.precisewolf.com/pricing/pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Pricing - Precise Wolf Digital",
      },
    ],
  },
  alternates: {
    canonical: "https://www.precisewolf.com/pricing",
  },
};

export default function Pricing() {
  return (
    <>
      <ContentBlock
        sectionClassName="pt-[125px] pb-[100px]"
        containerClassName="max-w-screen-xl mx-auto"
        rowClassName="flex"
        columnClassName="w-full px-4 mb-8 lg:mb-0"
      >
        <PricingTableStarter />
      </ContentBlock>

      <ContentBlock
        sectionClassName="pb-[100px]"
        containerClassName="max-w-screen-xl mx-auto"
        rowClassName="flex"
        columnClassName="w-full px-4 mb-8 lg:mb-0 reviews"
      >
        <GoogleReviews />
      </ContentBlock>

      <CTA />
    </>
  );
}