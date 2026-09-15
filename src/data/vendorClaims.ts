import type { ProductStatus } from './contentStatus';

// Editorial review date, NOT automatic verification at build time. Recheck before publishing.
export const vendorReviewDate = '2026-09-14';

export const vendorSources = {
  ispmAnnouncement: {
    title: 'Okta: ISPM AI agent discovery for every customer',
    url: 'https://www.okta.com/blog/identity-security/okta-ispm-ai-agent-discovery/',
    publishedAt: '2026-09-01',
  },
  endpointAnnouncement: {
    title: 'Okta: Your endpoints are running AI agents you cannot see',
    url: 'https://www.okta.com/blog/ai/shadow-ai-agent-discovery/',
    publishedAt: '2026-09-14',
  },
  endpointHelp: {
    title: 'Okta Help: Endpoint AI agent discovery',
    url: 'https://help.okta.com/en/programs/ai-agents/content/topics/ai-agents/endpoint-ai-agent-discovery-through-crowdstrike.htm',
    publishedAt: null,
  },
  discoveryHelp: {
    title: 'Okta Help: Discover and assess AI agents',
    url: 'https://help.okta.com/oie/en-us/Content/Topics/ai-agents/ai-agent-discover.htm',
    publishedAt: null,
  },
  selfServiceHelp: {
    title: 'Okta Help: Enable self-service features',
    url: 'https://help.okta.com/en-us/Content/Topics/Security/manage-EA-and-beta-features.htm',
    publishedAt: null,
  },
  gatewayAnnouncement: {
    title: 'Okta: Agent Gateway runtime governance',
    url: 'https://www.okta.com/blog/product-innovation/agent-gateway-runtime-governance/',
    publishedAt: '2026-07-23',
  },
  aiAgentsAnnouncement: {
    title: 'Okta for AI Agents is generally available',
    url: 'https://www.okta.com/blog/ai/okta-for-ai-agents-general-availability/',
    publishedAt: '2026-04-29',
  },
  xaaResourceGuide: {
    title: 'Okta Developer: Cross App Access for OIDC resource applications',
    url: 'https://developer.okta.com/blog/2026/08/24/xaa-oidc-resource',
    publishedAt: '2026-08-24',
  },
} as const;

type VendorClaim = {
  statement: string;
  sources: readonly (keyof typeof vendorSources)[];
  reviewedAt: string;
  productStatus?: ProductStatus;
  qualification: string;
};

// These are documentation-backed editorial claims, not Fiero lab-validation records.
// Render qualifications alongside any public claim; a status badge alone is insufficient.
export const vendorClaims = {
  ispmDiscovery: {
    statement: 'Okta announced AI-agent discovery inclusion across existing ISPM customer subscriptions.',
    sources: ['ispmAnnouncement', 'discoveryHelp'],
    reviewedAt: vendorReviewDate,
    qualification: 'Connector availability varies. Help documentation excludes discovery from Okta for AI Agents - Core for FedRAMP customers and states that Core is unavailable in US Military cells. Verify the applicable subscription; do not promise universal availability.',
  },
  endpointDiscovery: {
    statement: 'CrowdStrike-based endpoint agent and MCP discovery was announced as Early Access.',
    sources: ['endpointAnnouncement', 'endpointHelp'],
    reviewedAt: vendorReviewDate,
    productStatus: 'ea',
    qualification: 'The help page still carries a Beta label. Prefer the dated September 14 announcement while retaining this discrepancy and verifying organization eligibility. An observed connection alone does not establish effective resource permissions.',
  },
  selfServiceAvailability: {
    statement: 'Super admins can check Settings → Features for eligible self-service EA and Beta capabilities.',
    sources: ['selfServiceHelp'],
    reviewedAt: vendorReviewDate,
    qualification: 'Not every preview is self-service or available to every subscription. If the capability is absent, confirm with Okta; this is not an instruction to enable it automatically.',
  },
  agentGateway: {
    statement: 'Okta introduced Agent Gateway as a Research Release for runtime governance.',
    sources: ['gatewayAnnouncement'],
    reviewedAt: vendorReviewDate,
    productStatus: 'research',
    qualification: 'Do not make it a required GA production dependency. No Fiero runtime implementation was tested in this review.',
  },
  aiAgentsProduct: {
    statement: 'Okta announced general availability of Okta for AI Agents.',
    sources: ['aiAgentsAnnouncement'],
    reviewedAt: vendorReviewDate,
    productStatus: 'ga',
    qualification: 'Product-level GA does not make every connector, gateway or related capability GA. Check feature-level status and subscription eligibility separately.',
  },
  xaaDelegation: {
    statement: 'The documented OIDC XAA flow carries user context through an IdP-issued grant; the resource authorization server validates it and issues an access token under local policy.',
    sources: ['xaaResourceGuide'],
    reviewedAt: vendorReviewDate,
    qualification: 'This is an on-behalf-of-user pattern, not a universal prescription for autonomous workload identities. Task-specific authority also depends on resource policy and enforcement; adopting XAA alone does not prove task scoping.',
  },
} as const satisfies Record<string, VendorClaim>;
