# V3 Stage 1: decisions and content foundations

Reviewed September 14, 2026. Stage 1 prepares editorial metadata and a reusable badge; it does not publish V3 page content or change the assessment.

## Approved decisions

- Keep **Understand → Design → Build → Evolve** on the homepage.
- Place the six-stage technical roadmap on `/agentic-enterprise` in its later implementation stage: Discover → Establish Identity → Authorize → Connect → Govern → Orchestrate, with monitoring across the flow.
- Use **Solutions**, including the existing Delegated Identity Operations section. No separate public Labs category or route. Sandbox testing is supporting evidence, not a replacement for Solutions.
- Preserve the six assessment dimensions. Later add a separate Visibility / Understanding / Control profile, discovery/authorization questions in AI, and process evaluation in Automation.
- Offer Agent Exposure & Remediation Review for deployed discovery requiring interpretation and remediation.
- Assessment scoring remains **unapproved**: present the specification before editing questions, scoring, recommendations, saved progress or payloads. Include weights/mappings, overlapping signals, unknown/N/A answers, adoption branches, recommendation precedence, worked examples and version migration. Preserve results before contact and operation without a form endpoint.
- Keep current routes, domains, dependencies and public page output unchanged in Stage 1.

## Vendor review

The maintained statements, source links, publication dates and qualifications are in `src/data/vendorClaims.ts`. `reviewedAt` records an actual editorial check, not a freshness guarantee. Recheck before later publication or a product-status change.

| Topic | Finding | Required qualification |
| --- | --- | --- |
| ISPM discovery | September 1 inclusion announcement verified | Avoid universal SKU/connector promises; documentation identifies Core/public-sector limitations. |
| CrowdStrike endpoint/MCP discovery | September 14 announcement says EA | Help still says Beta. Keep the discrepancy visible and verify the customer's organization. |
| Self-service features | Settings → Features lists eligible capabilities | Do not promise every EA capability appears there or enable features as part of website work. |
| Agent Gateway | July 23 announcement describes Research Release | Optional explanatory pattern, not a required production dependency. |
| Okta for AI Agents | April 29 product GA announcement verified | Product GA does not establish feature-level GA. |
| XAA | Current resource guide supports delegated user context and local resource policy | Do not prescribe it for every workload or imply it automatically provides task-specific enforcement. |

The older [September 2025 XAA walkthrough](https://developer.okta.com/blog/2025/09/03/cross-app-access) now warns that its Admin Console steps are obsolete. Use the [August 2026 resource guide](https://developer.okta.com/blog/2026/08/24/xaa-oidc-resource) for future explanations; do not copy obsolete setup steps.

## Evidence still needed before publishing stronger claims

- No Fiero sandbox or customer deployment was accessed or tested during this review. Do not assign Lab Tested or Implementation Pattern based on the brief alone.
- The brief's Snowflake observations need an owner-supplied, sanitized evidence record. Until supplied, describe the scenario as illustrative, not a verified Fiero finding. A connection does not prove read/write/delete/admin authority.
- Validate the four-source discovery matrix per integration before the Technical Note. A broad vendor announcement does not establish a uniform set of fields across all builder, browser and endpoint connectors.
- Treat the blast-radius multiplication as a qualitative prioritization heuristic, not a calibrated numeric risk score.
- Confirm any added automation-history proof with the owner before claiming specific delivery outcomes. Keep existing substantiated experience claims; add no customers, metrics or deployment claims.
- Test denied actions, approval paths, token/resource scope, expiry, revocation and attribution before claiming a fully working governed-access implementation. The future diagram should distinguish intended architecture from validated behavior.

## Badge usage

`StatusBadge.astro` uses `contentStatus.ts`. It is static, keyboard-focusable, wraps on narrow widths and inherits text color for dark/light surfaces. Product/evidence labels are visible rather than communicated by color. Every badge requires an ISO review date and a source or evidence link. Keep material limitations in adjacent copy, not only in a tooltip.

```astro
---
import StatusBadge from '../components/StatusBadge.astro';
import { vendorClaims, vendorSources } from '../data/vendorClaims';
const claim = vendorClaims.agentGateway;
---
<StatusBadge
  kind="product"
  status={claim.productStatus}
  asOf={claim.reviewedAt}
  reference={vendorSources[claim.sources[0]].url}
/>
<p>{claim.qualification}</p>
```

Product labels: GA / EA / Beta / Research Release. Evidence labels: Lab Tested / Docs Validated / Implementation Pattern. Evidence labels require a record describing scope, method, date, outcomes and limitations. A single item may carry both a product and evidence badge; one never implies the other. Documentation review is not runtime testing.

## Remaining implementation sequence

1. **Stage 2:** Homepage messaging and teaching model; retain the four-stage delivery methodology and current assessment link.
2. **Stage 3:** Original access-request diagram, Tilya example and separate agent authority/business entitlement paths.
3. **Stage 4:** Technical Note and clearly sourced availability/evidence callouts, resolving the evidence gaps above.
4. **Stage 5:** Present assessment scoring specification for approval, then implement and test the approved extension with versioned state/payloads.
5. **Stage 6:** Service capability and deeper architecture updates using existing routes/components.

Stage 1 approval does not authorize those later stages or their publication.

## Stage 1 validation

- `npm run build` passed on Node v24.20.0: all 13 routes, no build warnings or errors.
- All seven badge variants rendered through Astro's container API, with visible category, source link and semantic review date. Data checks covered invalid dates/links, category mismatch and claim/source references.
- The isolated container check emitted an Astro Markdown-option deprecation warning. This was not emitted by the production build; no Markdown configuration was changed.
- A standalone TypeScript typecheck could not run because `tsc` is not installed. No dependencies were added. Compilation/render checks are not a full static typecheck.
- Pre/post SHA-256 checks confirmed all pre-existing `src` files, package files and Astro configuration were unchanged. Only AGENTS.md changed among those existing files. This working directory has no `.git` metadata, so a Git diff was unavailable.
- No browser visual review was performed: the badge is not yet wired into any public page, and existing page/layout/style files were untouched. Check light/dark contrast, focus and mobile wrapping in context when it is integrated.
