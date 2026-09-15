# Fiero V2 coding instructions

## Brand and positioning
- Public-facing brand: Fiero. Category: identity, automation and agentic systems company. Consulting is a delivery model, not the company category; do not imply the scale of a large systems integrator.
- Keep the repository name and fieroconsulting.com domain unchanged. fierohq.com is a future domain, not an approved migration. Preserve clearly legal Fiero Consulting references.
- Do not explicitly position anyone as Founder unless the project owner later changes this decision.
- Category: secure agentic enterprise, grounded in deep workforce IAM expertise.
- IAM is the credibility foundation: Okta Workforce Identity, Microsoft Entra, lifecycle automation, HRIS, SSO, SCIM, governance and enterprise integrations.
- Agent identity is an emerging extension of that expertise; avoid implying completed client deployments unless evidence is added.
- Tone: calm, precise, technically credible, architecture-led. Avoid hype.
- Fiero is Okta-first; Microsoft Entra ID and Active Directory are adjacent platforms. Do not add Ping or imply a generic multi-vendor IAM practice.
- V3 direction: Move AI agents from experimentation to governed enterprise infrastructure.
- AI reasons. Policy decides. Governed automation executes. The agent itself is not the authorization layer.
- Distinguish an agent's execution authority from the business entitlement granted to a person. Discovery relationships do not prove effective permissions; creator metadata does not establish accountable ownership.

## Methodology and content integrity
- Preserve the four-stage homepage delivery methodology: Understand → Design → Build → Evolve.
- Use Discover → Establish Identity → Authorize → Connect → Govern → Orchestrate as the deeper technical roadmap on /agentic-enterprise, with monitoring across all stages. Do not substitute it for the homepage methodology.
- Visibility → Understanding → Control is a teaching model and future agent profile, not a replacement delivery methodology.
- Solutions is the existing demonstration area, including Delegated Identity Operations. Do not introduce a separate public Fiero Labs section or navigation item. Sandbox validation supports Solutions and Technical Notes; it is not a new site category.
- Separate vendor product release status (GA, EA, Beta, Research Release) from Fiero evidence status (Lab Tested, Docs Validated, Implementation Pattern). Date and source product claims; preserve source disagreements and availability caveats.
- Docs Validated does not mean lab-tested. Require a recorded test scope/result for Lab Tested and production or representative end-to-end evidence for Implementation Pattern. Neither implies a public client case study.
- Do not present preview/research capabilities as required production dependencies. Use original Fiero diagrams, not copied vendor visuals. Do not invent metrics, deployments or test evidence.

## Assessment guardrails
- Preserve the six existing dimensions and results before contact capture. Keep graceful behavior without a form endpoint; never send answers before explicit contact submission.
- Approved future direction: a separate Visibility / Understanding / Control agent profile; discovery and authorization questions within AI; process evaluation within Automation.
- Recommend Agent Exposure & Remediation Review when discovery is deployed but interpretation/remediation is needed.
- Assessment implementation requires a separately approved scoring specification, including mappings, weights, conditional/N/A handling, recommendation precedence and backward compatibility. Direction approval alone is not scoring approval.
- Version saved progress and submission payload when the assessment extension is implemented. Do not collect credentials, configuration exports or sensitive customer data.

## Visual language
- Preserve deep teal #00262D and signal lime #BFEF4B.
- Use lime sparingly for active identity signals, policy decisions and CTAs.
- Prefer architecture diagrams and interfaces over stock photography.
- Avoid purple AI gradients, robots and decorative AI imagery.

## Engineering
- Astro is the default framework.
- Keep pages static unless a real dynamic requirement appears.
- Add React only for genuinely stateful interactive experiences later.
- Keep dependencies minimal.
- No secrets in client code.
- Maintain accessibility and responsive behavior with every change.
