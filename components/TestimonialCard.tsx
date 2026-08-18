"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const PREVIEW_LENGTH = 280;

export function TestimonialCard({
  name,
  quote,
}: {
  name: string;
  quote: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = quote.length > PREVIEW_LENGTH;
  const preview = needsToggle ? truncateAtWord(quote, PREVIEW_LENGTH) : quote;
  const display = expanded || !needsToggle ? quote : preview;
  const toggleId = `${name.replace(/\s+/g, "-").toLowerCase()}-review`;

  return (
    <li className="flex flex-col rounded-2xl border border-line bg-white p-6">
      <div className="flex gap-0.5 text-brand-dark" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <p id={toggleId} className="mt-4 flex-1 text-base leading-relaxed text-ink">
        “{display}
        {!expanded && needsToggle ? "…" : ""}”
      </p>
      {needsToggle ? (
        <button
          type="button"
          className="mt-3 self-start text-sm font-semibold text-brand-dark underline-offset-2 hover:underline"
          aria-expanded={expanded}
          aria-controls={toggleId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      ) : null}
      <p className="mt-4 text-sm font-semibold text-ink">{name}</p>
    </li>
  );
}

function truncateAtWord(text: string, max: number) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trimEnd();
}
