"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/app/styles/reviews.scss";

// ─────────────────────────────────────────────
// Add your reviews here — all five stars 🌟
// ─────────────────────────────────────────────
interface Review {
  author_name: string;
  text: string;
  profile_photo_url: string;
  relative_time_description?: string; // optional — e.g. "2 months ago"
}

const REVIEWS: Review[] = [
  
  
  {
    author_name: "Kurt London",
    text: "I've worked with Tadeo in my capacity as a personal injury attorney. He is a great guy to work with. He is knowledgeable, intelligent, and really kind. You can tell that he cares about what he does with his work with Latino Web Studio. He also has a great podcast. I recommend him!",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXHTTsfO7cTcUir0AuZo2BjiSI3ha77dy-14jlbGFnYll_bmPZu=s64-c-rp-mo-ba4-br100",
    relative_time_description: "2 months ago",
  },
  {
    author_name: "Steven White",
    text: "I highly recommend Latino Web Studio for website design and content creation. Ted Martinez is very professional, knowledgeable, and talented. I do forensic consultations and wanted a website to help attract clients and explain my services. After meeting with Ted to explain my needs, he far exceeded my expectations by designing an amazing website that is professional, modern, and creative. He was able to understand the nuances of my profession and build content, even using AI, that captures my background, profession, and services perfectly. It was so easy working with Ted. He is very friendly and hard-working. His prices are very reasonable. I look forward to continuing to work with him and I am definitely recommending him to my colleagues!",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocJmxmYFpRsIQEUxXSCq8Bk1Sv0kEn62hG-FKc9ZfVDSe6x-gg=s64-c-rp-mo-br100",
    relative_time_description: "3 months ago",
  },
  {
    author_name: "Steve Paul",
    text: "Tadeo is not your average website and media developer. This guy sets the bar high for any other company out there. I have used several other services in the past and have been let down on several occasions but Tadeo at Latino Web Studio is several notches above the rest. It starts off with a true personal approach to Tadeo listening and understanding of what you are looking for in your website. He then takes his time and sends you ideas and you are able to work with him either in person or via Zoom to start making your ideas come to life. I had some basic ideas down already that I wanted and Tadeo was able to help me steer clear of issues and problems before they occurred that I did not even see as a business owner myself. The outcome is a very reasonable and modest budget of \"I'll take care of it\" attitude from Tadeo. He has full control of my website and the content that goes into it after my approval, along with the amazing write ups and target marketing that he is doing. The best part is that the website is not only beautiful and crafted exactly to my liking and marketing idea BUT EVEN WITH JUST BEING LIVE FOR 4 WEEKS it is already bringing in QUALITY clients to my inbox and my phone. You CANNOT get that type of ROI from a nicer guy to boot! This review could have been shorter but it would not have done justice. Keep up the great work Tadeo! I am surely looking forward to more to come!",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocLiThUhxlpD_PqD44d5_p7eN260gI4mTuHDqkqtYJrsFp5EzOw=s64-c-rp-mo-ba3-br100",
    relative_time_description: "7 months ago",
  },
  {
    author_name: "Cisco Ortiz",
    text: "Tadeo put together a free homepage design for my epoxy business, and I couldn&apos;t be happier with what he came up with. The branding and user experience are spot on, and he really captured the look I was going for. He also walked me through some of his SEO results and showed how he&apos;s helped other businesses bring in more clients and grow their revenue. I&apos;m definitely looking forward to working with him again in the future.",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjVBCkeQVB7vjmyYeIb3ETxmKznDjuFanFpw7o7i9ZQvUnaz23s=s64-c-rp-mo-br100",
    relative_time_description: "6 months ago",
  },
  {
    author_name: "Hispano Maintenance",
    text: "I had a great experience working with this web design business. Tadeo responds quickly, is very approachable, and truly takes the time to understand your needs. The entire process felt smooth and efficient, and I&apos;m really happy with the results. Highly recommended!",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjW_2C4JVuDU-EAorG-1e0Ecr48Qb-_jn1oVeXOpu7x4Crn7UVP3IQ=s64-c-rp-mo-br100",
    relative_time_description: "7 months ago",
  },
  {
    author_name: "Dr. Shane Kurth",
    text: "Tadeo has been great to work with and was able to make our new website better than expected and most important was able to meet all of our discussed timelines! I would highly recommend their website development services!",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocKB6Ap3XcYHZUrlOnlZ9NPCZxBv-TnVIkbC1qF1VlSLKcN3iEU6=s64-c-rp-mo-ba2-br100",
    relative_time_description: "6 months ago",
  },
  {
    author_name: "Karla Cal",
    text: "Tadeo is absolutely amazing to work with. Tech can be intimidating for me and he has made everything easy to understand and has been very patient with me and all the questions I have. He helped me get my website up and running and he made the process easy and painless. I&apos;ve also witnessed how much support he shows others and the community. I love working with businesses who&apos;s founder have morals and values that align with helping others. Business owning is hard but finding great professionals who can help you with their area of expertise is a cheat code, happy to have Latino Web Studios in my corner!",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjUhinYGa-gLxzxtgmLrdsNSUv0oKYF40Kl2zIZYHzg6uR8ua5xa=s64-c-rp-mo-ba2-br100",
    relative_time_description: "a year ago",
  },
  
  // Add more reviews below ↓
];

const TOTAL_REVIEW_COUNT = 73; // Update to match your actual Google review count
const GOOGLE_REVIEW_LINK = "https://g.page/r/CbF4CHrc1dblEBM/review"; // Your Google review link

// ─────────────────────────────────────────────

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function GoogleReviews() {
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedStates((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <div className="flex flex-col content-center items-center gap-2 px-4">
        <div className="md:w-1/2 w-full">
          <div className="text-center px-4">
            <h2 className="m-0">Happy Clients</h2>
          </div>
        </div>
      </div>

      <div className="flex-row md:flex-row gap-2 px-4">
        <div className="lg:w-1/4 w-full text-center mx-auto">
          <div className="flex justify-center my-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          {TOTAL_REVIEW_COUNT} Google Reviews
        </div>

        <div className="w-full pt-8 pb-8">
          <Swiper
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 4 },
            }}
            spaceBetween={30}
            autoplay={true}
            modules={[Navigation, Pagination, Autoplay]}
          >
            {REVIEWS.map((review, index) => {
              const isLong = review.text.length > 200;
              const isExpanded = expandedStates[index] || false;
              const displayText =
                isLong && !isExpanded ? `${review.text.slice(0, 200)}...` : review.text;

              return (
                <SwiperSlide key={index} className="w-full">
                  <div className="bg-white rounded-lg shadow-md px-6 pb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={review.profile_photo_url}
                        alt={`${review.author_name}'s profile`}
                        className="w-12 h-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{review.author_name}</h3>
                        {review.relative_time_description && (
                          <p className="text-sm text-gray-600">
                            {review.relative_time_description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <StarRow />
                    </div>

                    <p className="text-sm text-gray-600">
                      {displayText}
                      {isLong && (
                        <button onClick={() => toggleExpand(index)} className="ml-2">
                          <strong>{isExpanded ? "Read Less" : "Read More"}</strong>
                        </button>
                      )}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="text-center">
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            className="btn-main mb-4 md:mb-0"
          >
            Leave a Google Review
          </a>
        </div>
      </div>
    </>
  );
}

export default GoogleReviews;