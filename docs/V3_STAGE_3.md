# V3 Stage 3: delegated identity operations

Completed September 15, 2026. Only the existing homepage solution diagram, its scoped styles and diagram interaction code changed.

## Implementation

- Replaced Maya with Tilya throughout the access-request example.
- Added business-access evaluation and resource-policy checks, with conditional human approval.
- Gave step 03 a full-width panel separating the agent execution path from the resulting user entitlement. Connection examples are alternatives, not a claim that every protocol provides task scoping.
- Added both human and acting-agent attribution to the control record.
- Added step 05 for automatic access expiry, connection review and revocation.
- Marked the flow as illustrative, not a live transaction. No vendor-release, lab-validation or customer-deployment claims were added.
- Preserved the one-time five-second animation and existing reduced-motion handling. Replaced the cosmetic click-selection behavior with focus/hover emphasis; stages remain keyboard-focusable with an explicit focus outline.
- Reused the existing ivory/teal/lime styles with homepage-scoped overrides. No global stylesheet, dependency or route changes.

## Validation

- Production build passed on Node 24: 13 routes, no warnings/errors.
- Desktop visual inspection confirmed the two authority layers and numbered flow. Keyboard navigation reached step 03 with a visible focus outline. The animation reached its completed state.
- Layout checks at 1440, 768, 390 and 320px confirmed no document overflow. Both execution paths stack on mobile; the narrow-screen text/path checks found no overflow. Desktop stage arrows run right/down/down/right in reading order. Card-edge connectors intentionally extend into grid gaps.
- Browser console check returned no warnings/errors. Reduced-motion behavior was preserved in source, not separately emulated during this stage.
- Source hashes confirmed only `src/pages/index.astro` changed among existing source/config files. Other homepage markup outside the solution section and scoped style/script blocks was unchanged. All assessment files remain unchanged.

Stage 4 (Technical Note) and the assessment scoring specification remain pending separate approval.

## Follow-up refinement: business-first simplification

The owner found the five boxed stages too wordy and requested the business workflow before the agent execution path. This refinement supersedes the layout and animation described above.

- Replaced nested cards/arrows with a compact five-step business workflow and a subordinate Step 03 execution explanation.
- Kept Tilya's entitlement separate from the agent's execution authority, with policy, conditional approval, attribution and lifecycle controls intact.
- Shortened the introduction; moved industry examples into a keyboard-accessible native disclosure.
- Removed the sequenced animation and noninteractive card focus stops. The new diagram is static and uses no client-side JavaScript.
- Extracted the section's diagram and scoped styles into `src/components/DelegatedIdentityFlow.astro`; removed superseded homepage diagram styles/script. Shared styles and all assessment files remain unchanged.
- Production build passed with 13 routes and no warnings. Layout checks at 1440, 768, 390 and 320px found no document overflow; desktop/mobile screenshots and keyboard disclosure behavior were checked.
- The development server briefly cached an unresolved import while the component was being created; invalidating the homepage module and reloading resolved it. Production compilation passed.
