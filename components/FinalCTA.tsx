import { Phone } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PhoneLink } from "@/components/PhoneLink";
import { SITE } from "@/lib/site";

export function FinalCTA() {
  return (
    <section
      className="bg-brand py-16 text-white sm:py-20"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-page max-w-3xl text-center">
        <h2 id="final-cta-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Don’t wait for the next storm to find the hidden damage.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/95">
          Get a <strong>free inspection</strong>, an honest estimate, and a team that{" "}
          <strong>works directly with your insurance company</strong>. Serving{" "}
          {SITE.serviceAreaLabel}.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PhoneLink
            location="final_cta"
            className="btn min-h-12 bg-white px-6 text-lg font-semibold text-brand-dark hover:bg-surface"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {SITE.phoneDisplay}
          </PhoneLink>
          <CtaLink
            href="#inspect"
            location="final_cta"
            ctaType="form"
            className="btn-secondary min-h-12 border-white px-6 text-lg"
          >
            Get My Free Inspection
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
