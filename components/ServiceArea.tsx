import Image from "next/image";
import { MapPin } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/lib/site";

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="section-anchor bg-header py-16 text-white sm:py-20"
      aria-labelledby="area-heading"
    >
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="area-heading"
            align="left"
            tone="dark"
            eyebrow="Hail Alley, Colorado"
            title="Lakewood, Aurora, Littleton — and the storms that come with them"
          />
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Colorado sits in Hail Alley. This region sees roughly{" "}
            <strong className="text-white">
              {SITE.hailAlleyStormsPerYear} hailstorms every year
            </strong>
            , and three out of four of those storms can cause catastrophic damage.
            If you live in {SITE.serviceAreaLabel} {SITE.surroundingLabel}, a
            “small” storm is still worth a professional look.
          </p>
          <ul className="mt-6 space-y-2 text-white/90">
            {SITE.serviceCities.map((city) => (
              <li key={city} className="flex items-center gap-2 font-medium">
                <MapPin className="h-4 w-4 text-brand-light" aria-hidden="true" />
                {city}, CO
              </li>
            ))}
          </ul>
          <CtaLink
            href="#inspect"
            location="service_area"
            ctaType="form"
            className="btn-primary mt-8 min-h-12"
          >
            Request a free inspection in my city
          </CtaLink>
        </div>

        <div className="relative min-h-[16rem] overflow-hidden rounded-2xl lg:min-h-[22rem]">
          <Image
            src="/images/residential-roofs.jpg"
            alt="Residential rooftops in the Denver metro — placeholder from the existing RUCA gallery"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <p className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white/80">
            Placeholder photo — replace with a client gallery image
          </p>
        </div>
      </div>
    </section>
  );
}
