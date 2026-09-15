# Wix → Astro / GitHub / Cloudflare migration checklist

## Inventory before DNS cutover
- Domain registrar
- DNS provider and nameservers
- Business email records (MX/SPF/DKIM/DMARC)
- Current Wix forms
- Booking/calendar links
- Analytics IDs
- Search Console verification
- Existing indexed URLs
- Redirect requirements
- Any Wix automations or CRM dependencies
- Current favicon / social preview assets

## GitHub
- Create private repository `fiero-v2`
- Push this scaffold
- Enable MFA
- Protect `main` after initial setup

## Cloudflare
- Create project / Worker static-assets deployment
- Connect GitHub after repository exists
- Use preview deployment before touching production DNS
- Add custom domain only after content QA

## Cutover
- Build and test production artifact
- Verify forms/contact links
- Verify sitemap/robots metadata
- Confirm redirects
- Cut DNS
- Monitor SSL, 404s and email records
- Keep Wix available briefly as rollback
- Cancel/downgrade Wix only after stabilization
