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

      <div className="container-page grid flex-1 items-center gap-8 pb-8 pt-[calc(var(--header-h)+1.25rem)] sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,24rem)] lg:pb-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-light">
            Insurance claim roof repair · {SITE.serviceAreaLabel}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            We’ll get your roof fixed — and deal with the insurance company for you.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/90">
            Hail season in Colorado’s Hail Alley is not a maybe — it’s{" "}
            <strong className="font-semibold text-white">
              {SITE.hailAlleyStormsPerYear} storms a year
            </strong>
            . Homeowners in Lakewood, Aurora, and Littleton get a{" "}
            <strong className="font-semibold text-white">free, often same-day inspection</strong>
            , an honest estimate, and a team that works directly with your adjuster.
          </p>

          <div className="mt-8">
            <PhoneLink location="hero" className="btn-primary min-h-12 px-6 text-lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {SITE.phoneDisplay}
            </PhoneLink>
            <p className="mt-4 text-sm text-white/75">
              No cost to you for the inspection. We handle the insurance company so you don’t
              have to.
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
