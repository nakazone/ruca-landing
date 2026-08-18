import { SectionHeading } from "@/components/SectionHeading";
import { FAQS } from "@/lib/site";

export function FAQ() {
  return (
    <section
      id="faq"
      className="section-anchor bg-surface py-16 sm:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="container-page max-w-3xl">
        <SectionHeading
          id="faq-heading"
          title="Questions homeowners ask before they call"
          intro="Straight answers so you can take the next step with less guesswork."
        />

        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-white">
          {FAQS.map((item) => (
            <details key={item.question} className="group px-5 py-2">
              <summary className="cursor-pointer list-none py-3 text-left text-base font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-brand-dark transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-4 pr-8 text-sm leading-relaxed text-muted sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
