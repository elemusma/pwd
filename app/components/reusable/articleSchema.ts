// utils/schema/articleSchema.ts
export const getArticleSchema = ({
  headline,
  section,
  description,
  datePublished,
  dateModified,
  image,
  keywords,
  wordCount,
  slug,
}: {
  headline: string;
  section: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image: string;
  keywords: string;
  wordCount: number;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  articleSection: section,
  description,
  datePublished,
  dateModified,
  keywords,
  wordCount,
  image,
  author: {
    "@type": "Person",
    name: "Tadeo Martinez",
    url: "https://www.precisewolf.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Precise Wolf Digital",
    logo: {
      "@type": "ImageObject",
      url: "https://www.precisewolf.com/assets/LWS-Workspace.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://www.precisewolf.com/articles/${slug}`,
  },
});
