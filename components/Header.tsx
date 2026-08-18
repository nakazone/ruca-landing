import Image from "next/image";
import { Phone } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PhoneLink } from "@/components/PhoneLink";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "#process", label: "How it works" },
  { href: "#damage-signs", label: "Damage signs" },
  { href: "#why-ruca", label: "Why RUCA" },
  { href: "#inspect", label: "Free inspection" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-header text-white shadow-md">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2.5 rounded-sm"
          aria-label={`${SITE.name} — back to top`}
        >
          <Image
            src="/logo-white.png"
            alt=""
            width={106}
            height={83}
            className="h-10 w-auto"
            priority
          />
          <span className="truncate text-sm font-medium leading-tight sm:text-base">
            {SITE.name}
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Page sections">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/85 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <PhoneLink
            location="header"
            className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium text-white hover:text-brand-light sm:px-3"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </PhoneLink>
          <CtaLink
            href="#inspect"
            location="header"
            ctaType="form"
            className="btn-primary hidden px-4 py-2 text-sm md:inline-flex"
          >
            Get Free Inspection
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
