# Interview value of the Fiero V2 rebuild

This migration is intentionally useful as a practical technical refresher for senior IAM / identity-engineering interviews.

## Technical story you can comfortably discuss

### Platform modernization
- Migrated a business site away from a proprietary visual builder into a Git-managed Astro codebase.
- Chose static rendering for the first release because the content does not require a server runtime.
- Kept the architecture extensible so later demos can add React islands and Cloudflare Worker APIs without rebuilding the marketing site.

### Git / deployment
- Repository becomes the source of truth.
- Preview changes before production cutover.
- Separate code changes from DNS migration.
- Keep rollback available until the new production deployment is stable.

### Identity architecture story
- Workforce IAM remains the foundation: Okta, Microsoft Entra, HR-driven lifecycle, SSO/MFA, SCIM, governance and automation.
- Emerging AI agents create an extension of familiar NHI/workload-identity questions: ownership, delegated authority, least privilege, short-lived access, attribution and lifecycle.
- Avoid creating a parallel credential model for agents where existing identity controls can be extended.

### Automation story
- Model cross-system processes as triggers, identity context, policy decisions, API actions, approvals, exceptions and audit events.
- This connects naturally to prior Okta Workflows / HRIS / SaaS-integration experience.

## Useful interview framing

"I’ve been refreshing my hands-on engineering skills by rebuilding my consulting site as a small Astro/Git/Cloudflare project rather than relying on a site builder. At the same time I’ve been using the content architecture to formalize how I think about workforce identity, lifecycle automation and the emerging agent-identity problem. It’s been a useful way to stay close to implementation while organizing the architecture patterns I’ve used in enterprise environments."

Do not present the website as evidence of completed AI-agent client implementations. Present it as technical research, architecture thinking and a modernized business platform built on top of deep IAM experience.
