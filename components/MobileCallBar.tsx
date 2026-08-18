import { Phone } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PhoneLink } from "@/components/PhoneLink";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-header/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <PhoneLink
          location="mobile_bar"
          className="btn-primary min-h-12 rounded-lg"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call Now
        </PhoneLink>
        <CtaLink
          href="#inspect"
          location="mobile_bar"
          ctaType="form"
          className="btn-outline min-h-12 rounded-lg border-white bg-transparent text-white hover:bg-white hover:text-ink"
        >
          Get Free Inspection
        </CtaLink>
      </div>
    </div>
  );
}
