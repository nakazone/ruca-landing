import { BadgeCheck, Handshake, Search, ShieldCheck } from "lucide-react";
import { TRUST_ITEMS } from "@/lib/site";

const ICONS = [BadgeCheck, ShieldCheck, Search, Handshake];

export function TrustStrip() {
  return (
    <div className="border-t border-white/10 bg-black/35">
      <ul className="container-page grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-6">
        {TRUST_ITEMS.map((item, index) => {
          const Icon = ICONS[index] ?? BadgeCheck;
          return (
            <li key={item} className="flex items-center gap-3 text-sm font-medium text-white sm:text-[0.95rem]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
