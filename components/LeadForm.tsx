"use client";

import { FormEvent, useId, useState, type ReactNode } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { trackFormSubmit } from "@/lib/analytics";
import {
  INSURANCE_STATUS,
  PREFERRED_CONTACT,
  ROOF_AGES,
  ROOF_TYPES,
  STORY_COUNTS,
  emptyLead,
  type FieldErrors,
  type FormVariant,
  type LeadPayload,
  validateLead,
} from "@/lib/lead";
import { SITE } from "@/lib/site";

const CONTACT_LABEL: Record<(typeof PREFERRED_CONTACT)[number], string> = {
  call: "Call",
  text: "Text",
  email: "Email",
};

export function InspectionForm({
  variant = "section",
  location,
}: {
  variant?: FormVariant;
  location: string;
}) {
  const formId = useId();
  const [values, setValues] = useState<LeadPayload>(() => emptyLead(variant));
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

  function setField<K extends keyof LeadPayload>(name: K, value: LeadPayload[K]) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const result = validateLead({ ...values, formVariant: variant });
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
    ? "hero-form rounded-2xl bg-white p-3.5 text-ink shadow-xl sm:p-4"
    : "rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8";

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
        <h2 id="hero-form-heading" className="mb-2.5 text-base font-bold text-ink">
          Request a free inspection
        </h2>
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

      <div className={`grid sm:grid-cols-2 ${isHero ? "gap-2" : "gap-3"}`}>
        <div className="sm:col-span-2">
          <Field
            id={fieldId("homeownerName")}
            errorId={errorId("homeownerName")}
            label="Homeowner name"
            required
            compact={isHero}
            error={errors.homeownerName}
          >
            <input
              id={fieldId("homeownerName")}
              name="homeownerName"
              autoComplete="name"
              className="input"
              value={values.homeownerName}
              aria-invalid={errors.homeownerName ? true : undefined}
              aria-describedby={errors.homeownerName ? errorId("homeownerName") : undefined}
              onChange={(e) => setField("homeownerName", e.target.value)}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id={fieldId("address")}
            errorId={errorId("address")}
            label="Address"
            required
            compact={isHero}
            error={errors.address}
          >
            <input
              id={fieldId("address")}
              name="address"
              autoComplete="street-address"
              className="input"
              value={values.address}
              aria-invalid={errors.address ? true : undefined}
              aria-describedby={errors.address ? errorId("address") : undefined}
              onChange={(e) => setField("address", e.target.value)}
            />
          </Field>
        </div>

        <Field
          id={fieldId("phone")}
          errorId={errorId("phone")}
          label="Phone"
          required
          compact={isHero}
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
            onChange={(e) => setField("phone", e.target.value)}
          />
        </Field>

        <Field
          id={fieldId("email")}
          errorId={errorId("email")}
          label="Email"
          required
          compact={isHero}
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
            onChange={(e) => setField("email", e.target.value)}
          />
        </Field>

        <div className={isHero ? "sm:col-span-2" : undefined}>
          <Field
            id={fieldId("roofType")}
            errorId={errorId("roofType")}
            label="Type of roof"
            required
            compact={isHero}
            error={errors.roofType}
          >
            <select
              id={fieldId("roofType")}
              name="roofType"
              className="input"
              value={values.roofType}
              aria-invalid={errors.roofType ? true : undefined}
              aria-describedby={errors.roofType ? errorId("roofType") : undefined}
              onChange={(e) => setField("roofType", e.target.value)}
            >
              <option value="">Select roof type</option>
              {ROOF_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {isHero ? null : (
          <>
            <Field
              id={fieldId("roofAge")}
              errorId={errorId("roofAge")}
              label="Age of roof"
              required
              error={errors.roofAge}
            >
              <select
                id={fieldId("roofAge")}
                name="roofAge"
                className="input"
                value={values.roofAge}
                aria-invalid={errors.roofAge ? true : undefined}
                aria-describedby={errors.roofAge ? errorId("roofAge") : undefined}
                onChange={(e) => setField("roofAge", e.target.value)}
              >
                <option value="">Select age</option>
                {ROOF_AGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={fieldId("stories")}
              errorId={errorId("stories")}
              label="How many stories"
              required
              error={errors.stories}
            >
              <select
                id={fieldId("stories")}
                name="stories"
                className="input"
                value={values.stories}
                aria-invalid={errors.stories ? true : undefined}
                aria-describedby={errors.stories ? errorId("stories") : undefined}
                onChange={(e) => setField("stories", e.target.value)}
              >
                <option value="">Select stories</option>
                {STORY_COUNTS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={fieldId("insurance")}
              errorId={errorId("insurance")}
              label="Insurance"
              required
              error={errors.insurance}
            >
              <select
                id={fieldId("insurance")}
                name="insurance"
                className="input"
                value={values.insurance}
                aria-invalid={errors.insurance ? true : undefined}
                aria-describedby={errors.insurance ? errorId("insurance") : undefined}
                onChange={(e) => setField("insurance", e.target.value)}
              >
                <option value="">Select insurance status</option>
                {INSURANCE_STATUS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <div className="sm:col-span-2">
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-ink">
                  Preferred method of contact
                  <span className="text-red-800">
                    {" "}
                    *<span className="sr-only"> required</span>
                  </span>
                </legend>
                <div className="flex flex-wrap gap-4">
                  {PREFERRED_CONTACT.map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center gap-2 text-sm text-ink"
                    >
                      <input
                        type="radio"
                        name={`${formId}-preferredContact`}
                        value={option}
                        checked={values.preferredContact === option}
                        onChange={() => setField("preferredContact", option)}
                        className="h-4 w-4 accent-brand"
                      />
                      {CONTACT_LABEL[option]}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <Field
            id={fieldId("damageDescription")}
            errorId={errorId("damageDescription")}
            label="Brief description of damage"
            compact={isHero}
            error={errors.damageDescription}
          >
            <textarea
              id={fieldId("damageDescription")}
              name="damageDescription"
              rows={isHero ? 1 : 4}
              className={`input resize-y ${isHero ? "min-h-[2.5rem]" : "min-h-[6.5rem]"}`}
              value={values.damageDescription}
              onChange={(e) => setField("damageDescription", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className={isHero ? "mt-2.5" : "mt-4"}>
        <label className={`flex items-start gap-2 text-ink ${isHero ? "text-[11px] leading-snug" : "text-xs leading-relaxed sm:text-sm"}`}>
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            onChange={(e) => setField("consent", e.target.checked)}
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

        <button
          type="submit"
          className={`btn-primary w-full disabled:opacity-70 ${isHero ? "mt-2.5 min-h-10 text-sm" : "mt-5 min-h-12"}`}
          disabled={pending}
        >
          {pending ? "Sending…" : "Request My Free Inspection"}
        </button>
      </div>
    </form>
  );
}

const STEPS = [
  "Free, often same-day inspection",
  "Honest, insurance-ready estimate",
  "We work directly with your adjuster",
];

export function LeadForm() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="form-heading">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-dark">
            Free inspection
          </p>
          <h2
            id="form-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Request your free damage inspection
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us about the property and how to reach you. We’ll follow up{" "}
            {SITE.responsePromise} — or call{" "}
            <PhoneLink location="form_intro" className="font-semibold text-brand-dark underline">
              {SITE.phoneDisplay}
            </PhoneLink>{" "}
            if you’d rather talk now.
          </p>
        </div>

        <ol className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left text-sm text-ink"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-0.5 leading-snug">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-3xl">
          <InspectionForm variant="section" location="form" />
        </div>
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
  compact,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  required?: boolean;
  error?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block font-medium text-ink ${compact ? "mb-1 text-xs" : "mb-1.5 text-sm"}`}
      >
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
