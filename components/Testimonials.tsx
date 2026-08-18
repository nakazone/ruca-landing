import { CtaLink } from "@/components/CtaLink";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/TestimonialCard";

const TESTIMONIALS = [
  {
    name: "Cherise Mosley-Stichter",
    quote:
      "Ruca Construction did a wonderful job working on our property. They handled everything for us from start to finish. We were actually quite surprised with everything they handled. The experience was so positive. They replaced our roof on both the house and gazebo, Siding, porch light, address post, and gutters, even covering the cost of sheathing (a portion of the work they started before getting the project approved by the Insurance Company). We could not have done this without their personalized attention to the details of our policy, giving priority to all our needs, and even going up against the Insurance Co. in our behalf. Valentin Toma (Project Manager) kept us informed of everything they were doing, from start to finish and went out of his way on several occasions to make things right. Valentine, Rory O'meara and the owner Aaron Brown worked as a team and made sure the Insurance Adjuster was aware of the Laws governing our policy and that the project was complete to our satisfactory. (even though the insurance company would not cover everything). In the end they did a great job and we are so happy with their work and understanding of Colorado laws. I recommend them to anyone who needs work done on their property and we will certainly use them again, if needed. I also would like to extend a special THANK YOU!, to Ruca and their many employees who remained professional throughout. It was a pleasure having your company work with us, we are so appreciative of all your hard work.",
  },
  {
    name: "Andrew Schleicher",
    quote:
      "I engaged in Ruca Consulting & Construction’s services after a hailstorm last year. I must admit I was a little skeptical at first due to the limited online presence and reviews. Aaron Brown walked me through the process with insurance and ultimately a full property restoration and I must admit I was thoroughly impressed with his eye for detail in getting damages covered and the construction. I would hands down recommend anyone looking for a roof replacement to engage in services with Ruca. I felt valued as a customer and have had a few roof replacements over the years with other larger companies and did not receive the customer service and quality that I received with Ruca.",
  },
  {
    name: "Ben Diaz",
    quote:
      "RUCA C&C is an insurance wizard and general contractor. My insurance company offered very little to restore my condo after a pipe burst. RUCA communicated efficiently and guaranteed I was compensated appropriately for the damage to my home. I recommend them to anyone and would happily use them again.",
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
          eyebrow="Customer reviews"
          title="Homeowners describe the work as professional — and the claim as easy"
        />

        <ul className="mt-10 grid items-start gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.name} name={item.name} quote={item.quote} />
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
