# RUCA Insurance Claims Landing Page

Standalone Next.js landing page for **RUCA Consulting & Construction**. It is not a redesign of [rucaconsulting.com](https://www.rucaconsulting.com/) — it exists to convert storm/hail insurance-claim visitors into a **phone call** or a **free-inspection lead**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Deploy on Vercel as a standard Next.js app. The only server route is `POST /api/lead`.

## Where to change business details

Edit `lib/site.ts`:

| What | Where |
| --- | --- |
| Phone number (display) | `SITE.phoneDisplay` |
| Phone `tel:` link / CallRail number | `NEXT_PUBLIC_PHONE_HREF` or `SITE.phoneHref` |
| Service area cities | `SITE.serviceCities` |
| FAQ copy (also feeds JSON-LD) | `FAQS` |
| Claims process steps | `PROCESS_STEPS` |

Brand colors are CSS variables in `app/globals.css` (space-separated RGB channels, e.g. `--color-brand: 151 71 255` for `#9747FF`). Tailwind tokens in `tailwind.config.ts` map to those variables — you should not need to edit component files to re-skin.

## Lead form → email / CRM

The form posts to `app/api/lead/route.ts`. That route validates the payload and is **not** tied to a vendor.

1. Set `LEAD_WEBHOOK_URL` in `.env.local` (or Vercel env) to a Zapier / Make / HubSpot / Google Sheets webhook, **or**
2. Replace the `// TODO: connect to email/CRM provider` block with Resend, SendGrid, etc.

Until a webhook is set, submissions succeed in development and are logged without PII.

## Analytics

- **Vercel Analytics** is on by default.
- **GA4**: set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXX`).
- Events already fire on phone clicks, CTA clicks, and form submit/success (`phone_click`, `cta_click`, `form_submit`, `form_submit_success`). Phone links use `data-cta="phone"` so CallRail or a Google Ads tag can bind later without a refactor.

## Open items for the client

These were not published on the live site (reviewed 2026-08-18) and are marked in the UI / config:

- Confirm brand hex values (currently extracted: CTA `#9747FF`, ink `#231F20`, surface `#F8F8F8`)
- High-resolution SVG logo (current mark pulled from the live site, 106×83 PNG)
- Physical mailing address
- Business email
- License / registration number (`[Add license #]`)
- Attributed Google / Facebook / Yelp reviews (current cards are paraphrased placeholders)
- Original photography from the RUCA gallery (current images are placeholders from the existing site)
- Lead delivery (email/CRM webhook)

## Project layout

```
app/page.tsx              # composes the one-pager
app/api/lead/route.ts     # lead POST
components/*.tsx          # one file per section
lib/site.ts               # business copy and facts
```
