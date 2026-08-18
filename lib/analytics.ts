export type AnalyticsEvent =
  | "phone_click"
  | "cta_click"
  | "form_submit"
  | "form_submit_success";

/**
 * Lightweight tracking hook. Fires to GA4 (gtag) and the dataLayer so a
 * Google Ads conversion tag or GTM container can be added later without
 * refactoring components. Phone clicks use a stable event name that
 * CallRail / call-tracking scripts can also listen for.
 */
export function trackEvent(
  name: AnalyticsEvent,
  params: Record<string, string> = {},
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

export function trackPhoneClick(location: string) {
  trackEvent("phone_click", {
    location,
    link_type: "tel",
  });
  trackEvent("cta_click", { location, cta_type: "phone" });
}

export function trackCtaClick(location: string, ctaType: string) {
  trackEvent("cta_click", { location, cta_type: ctaType });
}

export function trackFormSubmit(status: "attempt" | "success" | "error") {
  trackEvent("form_submit", { form_id: "lead_inspection", status });
  if (status === "success") {
    trackEvent("form_submit_success", { form_id: "lead_inspection" });
  }
}
