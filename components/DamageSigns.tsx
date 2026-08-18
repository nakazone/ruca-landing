import {
  BrickWall,
  CloudHail,
  Droplets,
  Home,
  Layers,
  TriangleAlert,
  Wind,
} from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { SectionHeading } from "@/components/SectionHeading";

const SIGNS = [
  {
    icon: CloudHail,
    title: "Divots in gutters",
    body: "Dents in metal gutters and downspouts are a common, ground-visible clue that hail hit the roof too.",
  },
  {
    icon: Layers,
    title: "Shingle divots, cracking, or flaking",
    body: "Asphalt shingles bruise, crack, or flake after hail. Damage is often missed from the driveway.",
  },
  {
    icon: Wind,
    title: "Granule loss",
    body: "Mineral granules in downspouts or bald spots on shingles mean the weather shield is wearing off.",
  },
  {
    icon: BrickWall,
    title: "Damaged flashing",
    body: "Bent or separated flashing around walls, vents, and valleys is a leak waiting to happen.",
  },
  {
    icon: Home,
    title: "Chimney damage",
    body: "Caps, cricket flashing, and masonry take direct hits in a hailstorm and are easy to overlook.",
  },
  {
    icon: Droplets,
    title: "Damaged wood shakes",
    body: "Wood shakes crack or shatter. Left alone, they let water into the roof deck.",
  },
];

export function DamageSigns() {
  return (
    <section
      id="damage-signs"
      className="section-anchor bg-surface py-16 sm:py-20"
      aria-labelledby="damage-heading"
    >
      <div className="container-page">
        <SectionHeading
          id="damage-heading"
          eyebrow="After a storm"
          title="Signs your roof took hail or wind damage"
          intro="If you recognize any of these, act now. Unrepaired storm damage leads to leaks that can harm structural supports, electrical systems, and indoor air — including mold growth."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((sign) => (
            <li
              key={sign.title}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <sign.icon className="h-7 w-7 text-brand-dark" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-ink">{sign.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{sign.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink">
            <strong>Waiting is the expensive option.</strong> A free inspection documents
            damage while it’s still clearly storm-related — which is what your insurer
            needs to see.
          </p>
        </div>

        <div className="mt-8 text-center">
          <CtaLink
            href="#inspect"
            location="damage_signs"
            ctaType="form"
            className="btn-primary min-h-12"
          >
            See it on my roof — request a free inspection
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
