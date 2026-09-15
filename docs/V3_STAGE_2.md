# V3 Stage 2: homepage messaging and teaching model

Implemented September 14, 2026, after Stage 2 approval.

## Changes

- Updated the homepage hero, supporting copy and meta description to the V3 positioning.
- Added the four-part priorities strip: Discover agents · Establish accountability · Authorize every connection · Automate real work. These are priorities, not customer metrics.
- Kept the current primary hero CTA, Assess Your Environment, pointing to `/assessment`. Changed the secondary hero CTA to Explore the Agentic Architecture, pointing to the existing `/agentic-enterprise` route.
- Updated the problem framing to distinguish agent visibility from accountable ownership and effective access.
- Added AI reasons. Policy decides. Governed automation executes. within the existing Control Layer section.
- Added `AgentControlModel.astro` within that section: Visibility → Understanding → Control, with explicit discovery-versus-authorization and deterministic-execution guidance.
- Used existing color, typography and card tokens, with scoped CSS for the longer hero and the new component. No global stylesheet or dependency changes.

## Preserved boundaries

- Four-stage homepage methodology, Solutions, existing access-request diagram and animation, service content, insights placeholders and assessment callout are unchanged.
- All assessment source files, questions, scores, recommendations, state and submission behavior are unchanged. The new teaching model does not represent a live assessment result.
- No new routes, public Labs area, vendor release claims, evidence badges or customer proof points.
- The Tilya example and revised solution diagram remain Stage 3 work. The deeper architecture route's content remains later-stage work.

## Validation

- Production build passed on Node v24.20.0: 13 routes, no warnings/errors.
- Browser checks at 1440, 768 and 390px verified responsive hero layout; the new model uses three columns on desktop and stacked cards on tablet/mobile. An additional 320px check found no horizontal overflow in the changed elements or document.
- Both hero CTAs were activated with the keyboard and reached the existing architecture and assessment routes.
- Homepage console check returned no errors/warnings. All homepage internal links and anchors resolved against production output.
- Pre/post SHA-256 comparison confirmed only `src/pages/index.astro` changed among existing source/configuration files. Protected homepage sections and the solution script also matched their pre-edit contents.
- No full questionnaire regression run was performed in this stage; assessment behavior and shared styles were not modified.

Stage 3 requires separate approval.
