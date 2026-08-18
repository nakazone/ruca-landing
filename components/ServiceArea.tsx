import { MapPin } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { SectionHeading } from "@/components/SectionHeading";
import { SERVICE_CITIES, SITE } from "@/lib/site";

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="section-anchor bg-header py-16 text-white sm:py-20"
      aria-labelledby="area-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="area-heading"
          tone="dark"
          eyebrow="Denver metro roofing"
          title="Insurance claim roof repair in Denver and surrounding areas"
          intro={
            <>
              RUCA serves homeowners across Denver and the surrounding Front Range.
              This region sits in Colorado’s Hail Alley, with roughly{" "}
              <strong className="font-semibold text-white">
                {SITE.hailAlleyStormsPerYear} hailstorms every year
              </strong>
              — and three out of four of those storms can cause catastrophic roof
              damage. If you are in the Denver metro, a “small” storm is still worth
              a professional look.
            </>
          }
        />

        <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {SERVICE_CITIES.map((city) => (
            <li key={city}>
              <a
                href="#inspect"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 transition hover:border-brand-light/40 hover:bg-white/10 hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-light" aria-hidden="true" />
                {city}, CO
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-white/70">
          Don’t see your city? We still likely serve your neighborhood —{" "}
          <a href="#inspect" className="font-medium text-brand-light underline-offset-2 hover:underline">
            request a free inspection
          </a>
          .
        </p>

        <div className="mt-8 text-center">
          <CtaLink
            href="#inspect"
            location="service_area"
            ctaType="form"
            className="btn-primary min-h-12"
          >
            Request a free inspection in Denver
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
