"use client";

import type { ReactNode } from "react";
import { trackCtaClick } from "@/lib/analytics";

type CtaLinkProps = {
  href: string;
  location: string;
  ctaType: string;
  className?: string;
  children: ReactNode;
};

export function CtaLink({
  href,
  location,
  ctaType,
  className,
  children,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={className}
      data-cta={ctaType}
      data-cta-location={location}
      onClick={() => trackCtaClick(location, ctaType)}
    >
      {children}
    </a>
  );
}
