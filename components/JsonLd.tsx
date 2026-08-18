import { FAQS, SITE } from "@/lib/site";

export function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "LocalBusiness"],
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneHref.replace("tel:", ""),
    image: `${SITE.url}/logo-white.png`,
    description:
      "Roofing contractor serving Lakewood, Aurora, and Littleton, Colorado. Free storm and hail damage inspections, insurance-claim support, and code-compliant repairs.",
    areaServed: SITE.serviceCities.map((city) => ({
      "@type": "City",
      name: `${city}, Colorado`,
    })),
    address: {
      "@type": "PostalAddress",
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.social.facebook, SITE.social.yelp],
    slogan: SITE.tagline,
    priceRange: "$$",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
