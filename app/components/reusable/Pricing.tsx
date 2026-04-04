"use client";
import React, { useState } from "react";

const PricingTableStarter = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {},
  );

  const toggleExpanded = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const plans = [
    {
      title: "Website Build",
    //   subtitle: "Web Design",
      price: "$5,000.00",
      typicalValue: "$7,500",
      description: "Included in Starter",
      features: [
        { name: "6 weeks timeline", value: null },
        { name: "SSL Certificate", value: "$75" },
        { name: "Ideal Client Focused Copy", value: "$1,400" },
        { name: "Google Business Profile Setup", value: "$475" },
        { name: "On-Page SEO optimization", value: "$850" },
        { name: "Mobile Optimization", value: "$425" },
        { name: "Google Analytics Setup", value: "$200" },
        { name: "Google Search Console Setup", value: "$200" },
        { name: "ADA Compliance Setup", value: "$1,275" },
        { name: "Conversion-Focused Design", value: "$1,650" },
        { name: "Schema Markup", value: "$175" },
        { name: "Sitemap", value: "$150" },
        { name: "6 Pages Including Homepage", value: "$625" },
      ],
      note: null,
      color: "text-[var(--accent-primary)]",
      border: "border-[var(--accent-primary)]",
      headerBg: "bg-[var(--accent-primary)]",
      headerColor: "text-black",
      buttonBg: "bg-[var(--accent-primary)]",
      buttonHover: "hover:bg-[var(--accent-primary-darker)]",
      link: "https://buy.stripe.com/00wfZgcbK6Nz62vcMF7wA1v",
      cta: "Make First Payment",
      ctaNote: "Half Now. Half at Completion.",
      saveBadge: true,
    },
    {
      title: "Monthly SEO Services",
    //   subtitle: "SEO",
      price: "$2,000.00",
      typicalValue: "$3,000",
      description: "Included in Starter",
      features: [
        { name: "5 SEO Articles (750-1000 words)", value: "$1,000" },
        { name: "Internal & Outbound Linking", value: "$200" },
        { name: "Image Optimization + Embeds", value: "$200" },
        { name: "Copyright-Free Images/Videos", value: "$150" },
        { name: "Content Strategy & Topic Planning", value: "$250" },
        { name: "Keyword Research", value: "$250" },
        { name: "Google Search Console Monitoring", value: "$150" },
        { name: "Monthly Site Audit & 404 Check", value: "$200" },
        { name: "Mobile-Responsive Website", value: "$150" },
        { name: "90+ Accessibility Score", value: "$250" },
        { name: "Web Hosting & Domain Renewal Support", value: "$200" },
      ],
      note: null,
      color: "text-[#b5539f]",
      border: "border-[#b5539f]",
      headerBg: "bg-[#b5539f]",
      headerColor: "text-black",
      buttonBg: "bg-[#b5539f]",
      buttonHover: "hover:bg-[#9a4587]",
      link: "https://buy.stripe.com/00gdST08wbWPbjq292",
      cta: "Subscribe to Monthly SEO",
      ctaNote: null,
      saveBadge: false,
      saveNote: "Save $1,000",
    },
  ];

  const formatPrice = (price: string, color: string) => {
    const [main, decimal] = price.split(".");
    return (
      <div className="flex items-baseline justify-start gap-2">
        <div
          className={`text-3xl font-bold ${color} flex items-start relative`}
        >
          <span>{main}</span>
          <sup className="text-sm align-super absolute top-1 -right-5">
            .{decimal}
          </sup>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-2 gap-6 items-start mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border-4 ${plan.border} rounded-lg overflow-hidden flex flex-col h-full bg-[#f7f7f7] text-black`}
          >
            {/* Header */}
            <div className={`${plan.headerBg} p-4`}>
              <p className={`text-sm font-semibold uppercase tracking-widest ${plan.headerColor} opacity-80`}>
                {plan.subtitle}
              </p>
              <h2 className={`text-4xl font-bold mt-1 ${plan.headerColor}`}>
                {plan.title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold my-2">{plan.description}</h3>

              {/* Features List */}
              <ul className="mb-4 pl-0 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-2 before:content-none text-sm p-0"
                  >
                    <div className="flex items-start gap-2 flex-grow">
                      <span className={`text-xl ${plan.color} flex-shrink-0`}>
                        ✔
                      </span>
                      <span>{feature.name}</span>
                    </div>
                    {expandedCards[index] && feature.value && (
                      <span className="text-sm text-gray-500 flex-shrink-0 ml-2">
                        {feature.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Value Summary when expanded */}
              {expandedCards[index] && (
                <div className="border-t-2 border-gray-200 pt-3 mb-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Typical Total Value:</span>
                    <span className={plan.color}>{plan.typicalValue}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg mt-1">
                    <span>Your Price:</span>
                    <span className="text-green-600">{plan.price}</span>
                  </div>
                </div>
              )}

              {plan.note && (
                <p className="text-red-500 font-bold text-base mb-4">
                  {plan.note}
                </p>
              )}

              {/* Pricing */}
              <div className="pricing">
                <div className="mb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xl text-gray-400 line-through">
                      {plan.typicalValue}
                    </span>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {plan.saveBadge
                        ? `Save ${(
                            ((parseFloat(plan.typicalValue.replace(/[$,]/g, "")) -
                              parseFloat(plan.price.replace(/[$,]/g, ""))) /
                              parseFloat(plan.typicalValue.replace(/[$,]/g, ""))) *
                            100
                          ).toFixed(0)}%`
                        : plan.saveNote}
                    </span>
                  </div>
                  {formatPrice(plan.price, plan.color)}
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleExpanded(index)}
                  className={`${plan.buttonBg} ${plan.buttonHover} text-white px-4 py-2 rounded text-sm font-semibold mb-4 transition-colors`}
                >
                  {expandedCards[index] ? "Hide" : "Show"} Value Breakdown
                </button>

                {plan.ctaNote && (
                  <p style={{ fontSize: "14px" }}>{plan.ctaNote}</p>
                )}
              </div>

              {/* CTA Link */}
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${plan.buttonBg} ${plan.buttonHover} text-white px-6 py-3 rounded-lg text-center font-semibold transition-colors block`}
              >
                {plan.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTableStarter;