export const PREFERRED_CONTACT = ["call", "text", "email"] as const;
export type PreferredContact = (typeof PREFERRED_CONTACT)[number];

export const FORM_VARIANTS = ["hero", "section"] as const;
export type FormVariant = (typeof FORM_VARIANTS)[number];

export const ROOF_TYPES = [
  "Asphalt shingle",
  "Metal",
  "Clay tile",
  "Wood shake",
  "Flat / TPO / EPDM",
  "Other / not sure",
] as const;
export type RoofType = (typeof ROOF_TYPES)[number];

export const ROOF_AGES = [
  "0–5 years",
  "6–10 years",
  "11–15 years",
  "16–20 years",
  "20+ years",
  "Not sure",
] as const;
export type RoofAge = (typeof ROOF_AGES)[number];

export const STORY_COUNTS = ["1 story", "2 stories", "3+ stories"] as const;
export type StoryCount = (typeof STORY_COUNTS)[number];

export const INSURANCE_STATUS = [
  "Haven’t filed a claim yet",
  "Claim in progress",
  "Claim approved",
  "Unsure / no insurance",
] as const;
export type InsuranceStatus = (typeof INSURANCE_STATUS)[number];

export type LeadPayload = {
  formVariant: FormVariant;
  homeownerName: string;
  address: string;
  phone: string;
  email: string;
  roofType: string;
  roofAge: string;
  stories: string;
  insurance: string;
  preferredContact: PreferredContact;
  damageDescription: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+.-]{10,20}$/;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isOneOf<T extends readonly string[]>(
  value: string,
  options: T,
): value is T[number] {
  return (options as readonly string[]).includes(value);
}

export function emptyLead(formVariant: FormVariant): LeadPayload {
  return {
    formVariant,
    homeownerName: "",
    address: "",
    phone: "",
    email: "",
    roofType: "",
    roofAge: "",
    stories: "",
    insurance: "",
    preferredContact: "call",
    damageDescription: "",
    consent: false,
  };
}

export function validateLead(
  input: unknown,
): { data: LeadPayload } | { errors: FieldErrors } {
  const raw =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const formVariant: FormVariant = isOneOf(asString(raw.formVariant), FORM_VARIANTS)
    ? (asString(raw.formVariant) as FormVariant)
    : "section";

  const preferred = asString(raw.preferredContact);
  const data: LeadPayload = {
    formVariant,
    homeownerName: asString(raw.homeownerName),
    address: asString(raw.address),
    phone: asString(raw.phone),
    email: asString(raw.email),
    roofType: asString(raw.roofType),
    roofAge: asString(raw.roofAge),
    stories: asString(raw.stories),
    insurance: asString(raw.insurance),
    preferredContact: isOneOf(preferred, PREFERRED_CONTACT)
      ? preferred
      : "call",
    damageDescription: asString(raw.damageDescription),
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  };

  const errors: FieldErrors = {};

  if (!data.homeownerName) errors.homeownerName = "Enter the homeowner’s name.";
  if (!data.address) errors.address = "Enter the property address.";
  if (!data.phone) errors.phone = "Enter a phone number.";
  else if (!PHONE_RE.test(data.phone) || data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }
  if (!data.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.roofType || !isOneOf(data.roofType, ROOF_TYPES)) {
    errors.roofType = "Select a roof type.";
  }

  if (formVariant === "section") {
    if (!data.roofAge || !isOneOf(data.roofAge, ROOF_AGES)) {
      errors.roofAge = "Select the age of the roof.";
    }
    if (!data.stories || !isOneOf(data.stories, STORY_COUNTS)) {
      errors.stories = "Select how many stories.";
    }
    if (!data.insurance || !isOneOf(data.insurance, INSURANCE_STATUS)) {
      errors.insurance = "Select an insurance option.";
    }
  }

  if (!data.consent) {
    errors.consent = "Please confirm we may follow up by call, text, or email.";
  }

  if (Object.keys(errors).length > 0) return { errors };
  return { data };
}
