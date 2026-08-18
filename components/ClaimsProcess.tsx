import { CtaLink } from "@/components/CtaLink";
import { PhoneLink } from "@/components/PhoneLink";
import { SectionHeading } from "@/components/SectionHeading";
import { PROCESS_STEPS, SITE } from "@/lib/site";

export function ClaimsProcess() {
  return (
    <section
      id="process"
      className="section-anchor bg-white py-16 sm:py-20"
      aria-labelledby="process-heading"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="The RUCA claims process"
          title="How we handle your insurance claim"
          intro={
            <>
              You don’t have to deal with the insurance company alone. Call us first —
              then we inspect, document, estimate, and advocate until the repair is
              done to code.
            </>
          }
        />

        <ol className="relative mt-12 grid gap-6 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-line bg-surface p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-ink">
          This is the difference:{" "}
          <strong className="text-brand-dark">we handle the insurance company for you.</strong>
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PhoneLink location="process" className="btn-primary min-h-12">
            Call {SITE.phoneDisplay}
          </PhoneLink>
          <CtaLink
            href="#inspect"
            location="process"
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
