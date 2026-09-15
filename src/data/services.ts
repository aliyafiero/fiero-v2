export const services = [
  {
    slug: 'agentic-readiness',
    index: '01 / STRATEGY',
    title: 'Agentic Enterprise Strategy & Readiness',
    short: 'Assess where AI agents fit, where the risk sits, and what identity and governance foundation is required before broader adoption.',
    intro: 'A focused architecture and readiness engagement for organizations moving from AI experimentation toward governed enterprise use.',
    outcomes: [
      'Current-state identity and agent-readiness view',
      'Priority agent use cases and cross-functional workflow opportunities',
      'Security, governance and ownership gaps',
      'Target-state architecture and phased roadmap'
    ],
    capabilities: ['AI-agent readiness', 'Identity architecture', 'Shadow-agent governance', 'Use-case prioritization', 'Operating model design']
  },
  {
    slug: 'agent-identity-access',
    index: '02 / IDENTITY',
    title: 'AI Agent Identity & Access',
    short: 'Design identity and authorization patterns for agents acting across enterprise systems without falling back to broad, persistent credentials.',
    intro: 'Identity architecture for human-to-agent and agent-to-system access, using enterprise controls rather than a parallel security model.',
    outcomes: [
      'Agent identity and ownership model',
      'Delegated and short-lived authorization patterns',
      'Human-to-agent attribution and audit design',
      'Integration approach for Okta, Microsoft Entra and enterprise applications'
    ],
    capabilities: ['Okta for AI Agents', 'Agent SSO', 'Cross App Access', 'Microsoft Entra Agent ID', 'OAuth/OIDC', 'MCP authorization']
  },
  {
    slug: 'agent-workflows',
    index: '03 / CONNECT',
    title: 'Secure Agent Workflow Orchestration',
    short: 'Connect agents to SaaS, APIs, data and enterprise knowledge with explicit access boundaries and approval points.',
    intro: 'Cross-system workflow architecture that combines automation with identity, security and operational accountability.',
    outcomes: [
      'Cross-functional workflow design',
      'System and API integration map',
      'Approval and exception controls',
      'Implementation plan for measurable business outcomes'
    ],
    capabilities: ['Enterprise SaaS integration', 'APIs', 'MCP', 'Workflow automation', 'Human-in-the-loop controls', 'Knowledge access']
  },
  {
    slug: 'agent-governance',
    index: '04 / GOVERN',
    title: 'Agent Governance & Lifecycle',
    short: 'Establish inventory, ownership, lifecycle, least privilege and review controls for autonomous and non-human identities.',
    intro: 'Governance patterns for treating agents as first-class identities with clear ownership and lifecycle controls.',
    outcomes: [
      'Agent inventory and ownership standard',
      'Onboarding and decommissioning controls',
      'Access certification and policy model',
      'Human oversight and exception process'
    ],
    capabilities: ['Agent inventory', 'Ownership', 'Lifecycle', 'Access reviews', 'Least privilege', 'Agent-to-agent controls']
  },
  {
    slug: 'identity-risk',
    index: '05 / RISK',
    title: 'AI Identity Risk & Runtime Security',
    short: 'Design controls to detect risky identities and preserve attribution, auditability, revocation and containment.',
    intro: 'Identity-centered runtime controls for an environment where autonomous software can act continuously across systems.',
    outcomes: [
      'Risk signal and escalation model',
      'Delegation-chain audit requirements',
      'Revocation and containment patterns',
      'Observability and incident-response requirements'
    ],
    capabilities: ['Identity risk', 'Attribution', 'Runtime controls', 'Auditability', 'Revocation', 'Incident response']
  },
  {
    slug: 'iam-modernization',
    index: '06 / FOUNDATION',
    title: 'Enterprise IAM Modernization',
    short: 'Modernize Okta Workforce Identity and Microsoft Entra foundations so people, applications and future agents inherit strong lifecycle and access controls.',
    intro: 'Hands-on workforce identity architecture and modernization across authentication, lifecycle, provisioning and governance.',
    outcomes: [
      'IAM architecture and platform roadmap',
      'SSO, MFA and application integration improvements',
      'HR-driven joiner/mover/leaver automation',
      'Governance, provisioning and operational cleanup'
    ],
    capabilities: ['Okta Workforce Identity', 'Microsoft Entra ID', 'SSO/MFA', 'SCIM', 'Lifecycle Management', 'HRIS integration', 'IGA', 'PAM']
  }
] as const;
