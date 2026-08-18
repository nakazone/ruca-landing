/**
 * Single source of truth for business details, CTAs, and copy.
 * Update phone, service area, and tracking numbers here — components read from this file.
 *
 * OPEN ITEMS for the client (not published on rucaconsulting.com as of 2026-08-18):
 * - Physical mailing address
 * - License / registration number
 * - Attributed Google / Facebook / Yelp reviews
 * - Official SVG logo + confirmation of brand hex values
 */

function resolveSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercelHost = (
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    ""
  ).trim();
  if (vercelHost) {
    return vercelHost.startsWith("http")
      ? vercelHost.replace(/\/$/, "")
      : `https://${vercelHost}`;
  }

  return "https://www.rucaconsulting.com";
}

export const SITE = {
  name: "RUCA Consulting & Construction",
  shortName: "RUCA",
  tagline:
    "One of the essential things in life is a roof over your head — so make it perfect.",
  phoneDisplay: "(720) 355-3133",
  /**
   * Swap NEXT_PUBLIC_PHONE_HREF for a CallRail (or similar) tracking number
   * without changing any component code.
   */
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF?.trim() || "tel:+17203553133",
  url: resolveSiteUrl(),
  existingSite: "https://www.rucaconsulting.com/",
  serviceAreaLabel: "Denver and surrounding areas",
  surroundingLabel: "across the Denver metro",
  hailAlleyStormsPerYear: "7–9",
  experienceYears: 30,
  reputationYears: 10,
  workmanshipGuaranteeYears: 10,
  responsePromise: "within one business day — often the same day",
  social: {
    facebook: "https://www.facebook.com/rucaconsulting",
    yelp: "https://www.yelp.com/biz/ruca-consulting-and-construction-denver",
  },
  legal: {
    terms: "https://www.rucaconsulting.com/terms-and-conditions/",
    privacy: "https://www.rucaconsulting.com/privacy-policy/",
  },
  /** OPEN ITEM — confirm before adding to footer or schema. */
  address: {
    street: "",
    city: "",
    region: "CO",
    postalCode: "",
    country: "US",
  },
  email: "contact@rucaconsulting.com",
  /** OPEN ITEM — e.g. [Add license #] */
  license: "",
} as const;

/** Nearby cities listed for local SEO — Denver metro and adjacent communities. */
export const SERVICE_CITIES = [
  "Denver",
  "Aurora",
  "Lakewood",
  "Littleton",
  "Arvada",
  "Westminster",
  "Thornton",
  "Centennial",
  "Boulder",
  "Broomfield",
  "Commerce City",
  "Englewood",
  "Greenwood Village",
  "Highlands Ranch",
  "Parker",
  "Castle Rock",
  "Golden",
  "Wheat Ridge",
  "Northglenn",
  "Brighton",
  "Lone Tree",
  "Castle Pines",
  "Louisville",
  "Lafayette",
  "Superior",
  "Edgewater",
  "Sheridan",
  "Federal Heights",
  "Cherry Hills Village",
  "Morrison",
  "Evergreen",
  "Conifer",
  "Ken Caryl",
  "Columbine",
] as const;

export const TRUST_ITEMS = [
  "30+ Years Combined Experience",
  "10-Year Workmanship Guarantee",
  "Free Damage Inspection",
  "We Work Directly With Your Insurance",
] as const;

export const PROCESS_STEPS = [
  {
    title: "Contact us first",
    body: "Call or request an inspection before you contact your insurance company. A professional assessment first gives you a clear picture of the damage — including what you cannot see from the ground.",
  },
  {
    title: "Free full-roof inspection",
    body: "We inspect the entire roof system: shingles, flashing, gutters, fascia, and chimney. The goal is to document all storm and hail damage, not just the obvious spots.",
  },
  {
    title: "Honest, insurance-ready estimate",
    body: "You receive a detailed, accurate estimate you can present to your insurer. No hidden surprises. No upcharges later.",
  },
  {
    title: "We work with your adjuster",
    body: "RUCA deals with the insurance company on your behalf, helps eliminate the guesswork, and pushes back when a lowball estimate does not match the real damage.",
  },
  {
    title: "Repair or replacement to code",
    body: "Once the claim is approved, we complete the work on schedule — to current building codes, with top-line materials, and a 10-year workmanship guarantee.",
  },
] as const;

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Should I call my insurance company or RUCA first?",
    answer:
      "Call RUCA first. Not all storm damage is visible from the ground. A trained inspector documents the full scope — then you contact your insurer with an honest, insurance-ready estimate. This is the same guidance from our existing FAQ: a professional assessment should come before you open a claim.",
  },
  {
    question: "Is the inspection really free?",
    answer:
      "Yes. Roof inspections and damage estimates are free, and we can often come out the same day. There is no cost to you for the assessment.",
  },
  {
    question: "Will you work directly with my insurance adjuster?",
    answer:
      "Yes. Once you have your estimate, we work with the insurance company and adjuster on your behalf. We stay involved so you are not left translating scopes, negotiating a lowball number, or guessing what the claim should cover.",
  },
  {
    question: "How long does a claim or roof replacement take?",
    answer:
      "Inspection is often same-day. After the claim is approved, most repairs and some replacements finish within a few days. Depending on materials, weather, and the insurer’s timeline, work can take as little as a day or as long as a week.",
  },
  {
    question: "What if my insurance company’s estimate doesn’t match the damage?",
    answer:
      "That happens more often than homeowners expect. We advocate for you: we compare the carrier’s scope to the real damage, document what’s missing, and push back so the approved work matches what the roof actually needs.",
  },
  {
    question: "What should I do if I think my roof has hail or storm damage?",
    answer:
      "Contact us as your first action. Leaks and broken shingles are obvious; granule loss, flashing damage, and hidden hail hits are not. Waiting lets water reach structural supports, electrical systems, and interior finishes — and can lead to mold.",
  },
  {
    question: "Which areas does RUCA serve?",
    answer:
      "We serve Denver and surrounding areas across the Front Range — including Aurora, Lakewood, Littleton, Arvada, Westminster, Thornton, Centennial, Boulder, Highlands Ranch, Parker, Castle Rock, and nearby communities. This region sits in Colorado’s Hail Alley, which sees roughly 7–9 hailstorms per year.",
  },
  {
    question: "Do you only work with homeowners?",
    answer:
      "No. We work with homeowners, insurance agents, contractors, and realtors. If you need a code-compliant, honest partner for a storm claim, we can help.",
  },
];
