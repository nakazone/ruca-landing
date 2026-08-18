export const PREFERRED_CONTACT = ["call", "text", "email"] as const;
export type PreferredContact = (typeof PREFERRED_CONTACT)[number];

export type LeadPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyAddress: string;
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

export function validateLead(
  input: unknown,
): { data: LeadPayload } | { errors: FieldErrors } {
  const raw =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const data: LeadPayload = {
    firstName: asString(raw.firstName),
    lastName: asString(raw.lastName),
    phone: asString(raw.phone),
    email: asString(raw.email),
    propertyAddress: asString(raw.propertyAddress),
    preferredContact: PREFERRED_CONTACT.includes(
      asString(raw.preferredContact) as PreferredContact,
    )
      ? (asString(raw.preferredContact) as PreferredContact)
      : "call",
    damageDescription: asString(raw.damageDescription),
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  };

  const errors: FieldErrors = {};

  if (!data.firstName) errors.firstName = "Enter your first name.";
  if (!data.lastName) errors.lastName = "Enter your last name.";
  if (!data.phone) errors.phone = "Enter a phone number.";
  else if (!PHONE_RE.test(data.phone) || data.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }
  if (!data.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.consent) {
    errors.consent = "Please confirm we may follow up by call, text, or email.";
  }

  if (Object.keys(errors).length > 0) return { errors };
  return { data };
}
