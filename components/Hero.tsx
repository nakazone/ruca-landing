import Image from "next/image";
import { Phone } from "lucide-react";
import { InspectionForm } from "@/components/LeadForm";
import { PhoneLink } from "@/components/PhoneLink";
import { TrustStrip } from "@/components/TrustStrip";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-dvh flex-col text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero-roof-damage.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-roof-damage.jpg"
          aria-hidden="true"
        >
          <source src="/videoBackground.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-header" />
      </div>

      <div className="container-page grid flex-1 items-center gap-6 pb-6 pt-[calc(var(--header-h)+1rem)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,26rem)] lg:gap-8 lg:pb-8">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-light sm:text-sm">
            Insurance claim roof repair · {SITE.serviceAreaLabel}
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.4rem]"
          >
            We’ll get your roof fixed — and deal with the insurance company for you.
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-white/90">
            Colorado’s Hail Alley sees{" "}
            <strong className="font-semibold text-white">
              {SITE.hailAlleyStormsPerYear} storms a year
            </strong>
            . Get a{" "}
            <strong className="font-semibold text-white">free, often same-day inspection</strong>
            {" "}in Denver and surrounding areas — we work directly with your adjuster.
          </p>
          <div className="mt-5">
            <PhoneLink location="hero" className="btn-primary min-h-11 px-5">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {SITE.phoneDisplay}
            </PhoneLink>
            <p className="mt-2 text-sm text-white/75">
              No cost to you. We handle the insurance company so you don’t have to.
            </p>
          </div>
        </div>

        <div id="inspect" className="section-anchor w-full">
          <InspectionForm variant="hero" location="hero_form" />
        </div>
      </div>

      <TrustStrip />
    </section>
  );
}
