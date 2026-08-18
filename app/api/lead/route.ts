import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = validateLead(json);
  if ("errors" in result) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 },
    );
  }

  const lead = result.data;
  const payload = {
    source: "ruca-insurance-claims-landing",
    submittedAt: new Date().toISOString(),
    ...lead,
  };

  // TODO: connect to email/CRM provider
  // Keep this route vendor-agnostic. When you are ready, set LEAD_WEBHOOK_URL
  // (Zapier, Make, HubSpot, a Sheets script, etc.) or replace the block below
  // with a provider SDK such as Resend or SendGrid. Example:
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ from, to, subject, text: JSON.stringify(lead) });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!forwarded.ok) {
      console.error("[lead] webhook responded", forwarded.status);
      return NextResponse.json(
        {
          ok: false,
          message: "We couldn’t deliver your request. Please call us instead.",
        },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[lead] captured (set LEAD_WEBHOOK_URL to deliver)", {
      formVariant: lead.formVariant,
      roofType: lead.roofType,
      hasAddress: Boolean(lead.address),
    });
  }

  return NextResponse.json({ ok: true });
}
