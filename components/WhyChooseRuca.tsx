import {
  BadgeCheck,
  Building2,
  HardHat,
  Handshake,
  Search,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PhoneLink } from "@/components/PhoneLink";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/lib/site";

const REASONS = [
  {
    icon: BadgeCheck,
    title: "30+ years combined experience",
    body: "A crew that has seen Colorado storms — and the claims that follow — for decades.",
  },
  {
    icon: Building2,
    title: "Established local reputation",
    body: "About 10 years of trusted work for homeowners and businesses in the Denver metro.",
  },
  {
    icon: ShieldCheck,
    title: "10-year workmanship guarantee",
    body: "The install is backed. We don’t disappear after the last shingle is nailed down.",
  },
  {
    icon: Search,
    title: "Free, often same-day inspections",
    body: "No cost to you for a full damage assessment and an honest estimate.",
  },
  {
    icon: HardHat,
    title: "Code-compliant, top-tier materials",
    body: "We follow current building codes to the letter and use materials built for Hail Alley.",
  },
  {
    icon: Handshake,
    title: "Direct insurance coordination",
    body: "We work with your carrier and adjuster so you aren’t stuck in the middle.",
  },
  {
    icon: Users,
    title: "Homeowners, agents, contractors, realtors",
    body: "One roofing partner for the people who live in the home and the professionals who serve them.",
  },
  {
    icon: Siren,
    title: "Emergency storm & leak response",
    body: "Active leaks, tree damage, and storm blow-offs — we respond when waiting isn’t an option.",
  },
];

export function WhyChooseRuca() {
  return (
    <section
      id="why-ruca"
      className="section-anchor bg-white py-16 sm:py-20"
      aria-labelledby="why-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="why-heading"
          eyebrow="Why homeowners call RUCA first"
          title="A local roofing team that takes the claim — and the stress — off your plate"
          intro="Honest estimates. No hidden surprises. We live and die by the building code, and we stay on the claim until the work is done right."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <li
              key={reason.title}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <reason.icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold text-ink">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted">
          License #:{" "}
          <span className="font-medium text-ink">[Add license #]</span>
          <span className="block sm:inline sm:before:content-['_·_']">
            Confirm with the client before launch.
          </span>
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PhoneLink location="why_ruca" className="btn-primary min-h-12">
            Call {SITE.phoneDisplay}
          </PhoneLink>
          <CtaLink
            href="#inspect"
            location="why_ruca"
            ctaType="form"
            className="btn-outline min-h-12"
          >
            Get My Free Inspection
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
