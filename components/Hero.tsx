import Image from "next/image";
import { Phone } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PhoneLink } from "@/components/PhoneLink";
import { TrustStrip } from "@/components/TrustStrip";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate text-white" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-roof-damage.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-header" />
      </div>

      <p className="sr-only">
        Placeholder photo from the existing RUCA site gallery — replace with a
        client-supplied storm or roof image before launch.
      </p>

      <div className="container-page flex min-h-[34rem] flex-col justify-center py-16 sm:min-h-[38rem] sm:py-20 lg:min-h-[42rem]">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-light">
          Insurance claim roof repair · {SITE.serviceAreaLabel}
        </p>
        <h1
          id="hero-heading"
          className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
        >
          We’ll get your roof fixed — and deal with the insurance company for you.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
          Hail season in Colorado’s Hail Alley is not a maybe — it’s{" "}
          <strong className="font-semibold text-white">
            {SITE.hailAlleyStormsPerYear} storms a year
          </strong>
          . Homeowners in Lakewood, Aurora, and Littleton get a{" "}
          <strong className="font-semibold text-white">free, often same-day inspection</strong>
          , an honest estimate, and a team that works directly with your adjuster.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PhoneLink location="hero" className="btn-primary min-h-12 px-6 text-lg">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {SITE.phoneDisplay}
          </PhoneLink>
          <CtaLink
            href="#inspect"
            location="hero"
            ctaType="form"
            className="btn-secondary min-h-12 px-6 text-lg"
          >
            Get My Free Inspection
          </CtaLink>
        </div>
        <p className="mt-4 text-sm text-white/75">
          No cost to you for the inspection. We handle the insurance company so you don’t have to.
        </p>
      </div>

      <TrustStrip />
    </section>
  );
}
