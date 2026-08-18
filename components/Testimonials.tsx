import { Star } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Paraphrased from themes on the live RUCA site. Do not treat these as
 * attributed quotes until the client supplies Google / Facebook / Yelp reviews.
 */
const TESTIMONIALS = [
  {
    quote:
      "The work felt professional and top-notch from start to finish — especially after hail and wind damage. They took the claim off our plate.",
    theme: "Professional service after storm damage",
  },
  {
    quote:
      "They coordinated with the insurance company so we weren’t guessing. The process felt straightforward instead of stressful.",
    theme: "Made the insurance process easy",
  },
  {
    quote:
      "The roofing was completed in a single day, with careful attention to detail. We were glad we didn’t have to manage the insurer ourselves.",
    theme: "Finished in a single day",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="section-anchor bg-surface py-16 sm:py-20"
      aria-labelledby="reviews-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="reviews-heading"
          eyebrow="What customers emphasize"
          title="Homeowners describe the work as professional — and the claim as easy"
        />

        <p className="mx-auto mt-4 max-w-2xl rounded-lg border border-dashed border-brand/40 bg-brand/5 px-4 py-3 text-center text-sm text-ink">
          Placeholder content — replace with attributed Google, Facebook, or Yelp
          reviews supplied by the client before launch.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li
              key={item.theme}
              className="flex flex-col rounded-2xl border border-line bg-white p-6"
            >
              <div className="flex gap-0.5 text-brand-dark" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink">
                “{item.quote}”
              </p>
              <p className="mt-4 text-sm font-medium text-muted">{item.theme}</p>
              <p className="text-xs text-muted">Colorado homeowner · placeholder</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <CtaLink
            href="#inspect"
            location="testimonials"
            ctaType="form"
            className="btn-primary min-h-12"
          >
            Get the same straightforward process
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
