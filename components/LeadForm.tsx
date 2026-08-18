"use client";

import { FormEvent, useId, useState, type ReactNode } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { trackFormSubmit } from "@/lib/analytics";
import {
  PREFERRED_CONTACT,
  type FieldErrors,
  type LeadPayload,
  validateLead,
} from "@/lib/lead";
import { SITE } from "@/lib/site";

const EMPTY: LeadPayload = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  propertyAddress: "",
  preferredContact: "call",
  damageDescription: "",
  consent: false,
};

const CONTACT_LABEL: Record<(typeof PREFERRED_CONTACT)[number], string> = {
  call: "Call",
  text: "Text",
  email: "Email",
};

type FormVariant = "hero" | "section";

export function InspectionForm({
  variant = "section",
  location,
}: {
  variant?: FormVariant;
  location: string;
}) {
  const formId = useId();
  const [values, setValues] = useState<LeadPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const isHero = variant === "hero";

  function fieldId(name: keyof LeadPayload) {
    return `${formId}-${name}`;
  }

  function errorId(name: keyof LeadPayload) {
    return `${formId}-${name}-error`;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const result = validateLead(values);
    if ("errors" in result) {
      setErrors(result.errors);
      trackFormSubmit("error");
      return;
    }

    setErrors({});
    setPending(true);
    trackFormSubmit("attempt");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
      };

      if (!response.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setServerError(json.message ?? "Something went wrong. Please call us instead.");
        trackFormSubmit("error");
        return;
      }

      setSuccess(true);
      trackFormSubmit("success");
    } catch {
      setServerError("We couldn’t send the form. Please call us instead.");
      trackFormSubmit("error");
    } finally {
      setPending(false);
    }
  }

  const cardClass = isHero
    ? "rounded-2xl bg-white p-5 text-ink shadow-xl sm:p-6"
    : "rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-8";

  if (success) {
    return (
      <div className={`${cardClass} text-center`} role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-dark" aria-hidden="true" />
        <p className="mt-3 text-xl font-bold text-ink">Thanks — we received your request.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We’ll call you {SITE.responsePromise} to schedule your{" "}
          <strong className="text-ink">free inspection</strong>.
        </p>
        <PhoneLink
          location={`${location}_success`}
          className="btn-primary mt-5 inline-flex min-h-12"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {SITE.phoneDisplay} now
        </PhoneLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cardClass}
      aria-labelledby={isHero ? "hero-form-heading" : undefined}
    >
      {isHero ? (
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-dark">
            Free inspection
          </p>
          <h2 id="hero-form-heading" className="mt-1 text-xl font-bold text-ink sm:text-2xl">
            Request your free inspection
          </h2>
          <p className="mt-1 text-sm text-muted">Often same-day. No cost to you.</p>
        </div>
      ) : null}

      {serverError ? (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {serverError}
        </p>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          Please fix the highlighted fields and submit again.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id={fieldId("firstName")}
          errorId={errorId("firstName")}
          label="First name"
          required
          error={errors.firstName}
        >
          <input
            id={fieldId("firstName")}
            name="firstName"
            autoComplete="given-name"
            className="input"
            value={values.firstName}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? errorId("firstName") : undefined}
            onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
          />
        </Field>
        <Field
          id={fieldId("lastName")}
          errorId={errorId("lastName")}
          label="Last name"
          required
          error={errors.lastName}
        >
          <input
            id={fieldId("lastName")}
            name="lastName"
            autoComplete="family-name"
            className="input"
            value={values.lastName}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? errorId("lastName") : undefined}
            onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))}
          />
        </Field>
        <Field
          id={fieldId("phone")}
          errorId={errorId("phone")}
          label="Phone"
          required
          error={errors.phone}
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="input"
            value={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          />
        </Field>
        <Field
          id={fieldId("email")}
          errorId={errorId("email")}
          label="Email"
          required
          error={errors.email}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            className="input"
            value={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field
          id={fieldId("propertyAddress")}
          errorId={errorId("propertyAddress")}
          label="Property address"
          error={errors.propertyAddress}
        >
          <input
            id={fieldId("propertyAddress")}
            name="propertyAddress"
            autoComplete="street-address"
            className="input"
            value={values.propertyAddress}
            onChange={(e) => setValues((v) => ({ ...v, propertyAddress: e.target.value }))}
          />
        </Field>
      </div>

      <fieldset className="mt-3">
        <legend className="mb-2 text-sm font-medium text-ink">Preferred contact method</legend>
        <div className="flex flex-wrap gap-4">
          {PREFERRED_CONTACT.map((option) => (
            <label key={option} className="inline-flex items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name={`${formId}-preferredContact`}
                value={option}
                checked={values.preferredContact === option}
                onChange={() => setValues((v) => ({ ...v, preferredContact: option }))}
                className="h-4 w-4 accent-brand"
              />
              {CONTACT_LABEL[option]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-3">
        <Field
          id={fieldId("damageDescription")}
          errorId={errorId("damageDescription")}
          label="Brief description of damage"
          error={errors.damageDescription}
        >
          <textarea
            id={fieldId("damageDescription")}
            name="damageDescription"
            rows={isHero ? 2 : 4}
            className={`input resize-y ${isHero ? "min-h-[4.5rem]" : "min-h-[6.5rem]"}`}
            value={values.damageDescription}
            onChange={(e) =>
              setValues((v) => ({ ...v, damageDescription: e.target.value }))
            }
          />
        </Field>
      </div>

      <div className="mt-3">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-ink sm:text-sm">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
            className="mt-1 h-4 w-4 shrink-0 accent-brand"
          />
          <span>
            By submitting this form, you give RUCA Consulting & Construction permission to
            follow up by call, text, or email.
          </span>
        </label>
        {errors.consent ? (
          <p id={errorId("consent")} className="mt-1 text-sm text-red-800">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="btn-primary mt-4 min-h-12 w-full disabled:opacity-70"
        disabled={pending}
      >
        {pending ? "Sending…" : "Request My Free Inspection"}
      </button>
    </form>
  );
}

export function LeadForm() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="form-heading">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-dark">
            Free inspection
          </p>
          <h2 id="form-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Request your free damage inspection
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us where the property is and how to reach you. We’ll follow up{" "}
            {SITE.responsePromise} — or call{" "}
            <PhoneLink location="form_intro" className="font-semibold text-brand-dark underline">
              {SITE.phoneDisplay}
            </PhoneLink>{" "}
            if you’d rather talk now.
          </p>
          <ul className="mt-6 space-y-2 text-ink">
            <li className="flex gap-2">
              <span className="font-bold text-brand-dark">1.</span>
              Free, often same-day inspection
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-brand-dark">2.</span>
              Honest, insurance-ready estimate
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-brand-dark">3.</span>
              We work directly with your adjuster
            </li>
          </ul>
        </div>

        <InspectionForm variant="section" location="form" />
      </div>
    </section>
  );
}

function Field({
  id,
  errorId,
  label,
  required,
  error,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-red-800">
            {" "}
            *<span className="sr-only"> required</span>
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
