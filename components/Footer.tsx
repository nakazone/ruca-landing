import Image from "next/image";
import { Phone } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-header pb-24 pt-14 text-white md:pb-10">
      <div className="container-page grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-white.png"
              alt=""
              width={106}
              height={83}
              className="h-10 w-auto"
            />
            <p className="text-sm font-medium leading-tight">{SITE.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            {SITE.tagline}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Call or visit
          </h2>
          <PhoneLink
            location="footer"
            className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-brand-light"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </PhoneLink>
          <p className="mt-3 text-sm text-white/75">
            Serving {SITE.serviceAreaLabel} {SITE.surroundingLabel}.
          </p>
          <p className="mt-2 text-sm text-white/50">
            Mailing address: [Add street address], [Add city], CO [Add ZIP]
          </p>
          <p className="text-sm text-white/50">Email: [Add business email]</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Follow
          </h2>
          <div className="mt-3 flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-3 text-xs font-bold tracking-wide hover:bg-white/20"
              aria-label="RUCA Consulting & Construction on Facebook (opens in a new tab)"
            >
              Facebook
            </a>
            <a
              href={SITE.social.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-3 text-xs font-bold tracking-wide hover:bg-white/20"
              aria-label="RUCA Consulting & Construction on Yelp (opens in a new tab)"
            >
              Yelp
            </a>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={SITE.existingSite}
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Full RUCA website
              </a>
            </li>
            <li>
              <a
                href={SITE.legal.terms}
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a
                href={SITE.legal.privacy}
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
        © {2026} {SITE.name}. All rights reserved. This page is a
        standalone insurance-claims landing page — not a replacement for the main
        site.
      </p>
    </footer>
  );
}
