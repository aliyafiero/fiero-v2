# Fiero V2

Lean Astro rebuild of Fiero Consulting, replacing the Wix implementation while preserving the Fiero deep-teal + signal-lime identity.

## Scope of this migration

Included now:
- Astro static site
- Homepage based on the approved Fiero V2 skeleton
- Agentic Enterprise page
- Services overview + six statically generated service routes
- About, Insights and Contact page shells
- Responsive design system and subtle reveal animation
- Cloudflare static-assets configuration

Deferred intentionally:
- Fiero Labs
- React islands
- Okta sandbox demos
- Cloudflare Worker APIs
- CRM/booking integration
- Full article publishing system
- complex analytics / product telemetry

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Deploy to Cloudflare

This project is currently static, so no Astro Cloudflare adapter is required. After build:

```bash
npx wrangler@latest deploy
```

Or connect the GitHub repository to Cloudflare Workers Builds and use:
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

## Before production cutover

1. Replace placeholder contact details.
2. Confirm domain/DNS ownership and current Wix dependencies.
3. Preserve or redirect existing URLs.
4. Confirm all public proof claims.
5. Add analytics/Search Console.
6. QA mobile, accessibility and links.
7. Keep Wix live until the new site is verified on production DNS.
