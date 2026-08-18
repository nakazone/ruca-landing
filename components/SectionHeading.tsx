import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  id,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  id?: string;
  tone?: "light" | "dark";
}) {
  const alignment = align === "left" ? "text-left" : "mx-auto text-center";
  const eyebrowColor = tone === "dark" ? "text-brand-light" : "text-brand-dark";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const introColor = tone === "dark" ? "text-white/85" : "text-muted";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className={`text-sm font-medium uppercase tracking-[0.18em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-balance text-3xl font-bold tracking-tight ${titleColor} sm:text-4xl ${eyebrow ? "mt-3" : ""}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-pretty text-lg leading-relaxed ${introColor}`}>{intro}</p>
      ) : null}
    </div>
  );
}
