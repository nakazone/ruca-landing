"use client";

import type { ReactNode } from "react";
import { trackPhoneClick } from "@/lib/analytics";
import { SITE } from "@/lib/site";

type PhoneLinkProps = {
  location: string;
  className?: string;
  children?: ReactNode;
  /** Visible label; an accessible name is always included. */
  ariaLabel?: string;
};

export function PhoneLink({
  location,
  className,
  children,
  ariaLabel,
}: PhoneLinkProps) {
  return (
    <a
      href={SITE.phoneHref}
      className={className}
      data-cta="phone"
      data-cta-location={location}
      aria-label={
        ariaLabel ?? `Call ${SITE.name} at ${SITE.phoneDisplay}`
      }
      onClick={() => trackPhoneClick(location)}
    >
      {children ?? SITE.phoneDisplay}
    </a>
  );
}
