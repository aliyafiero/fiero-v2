import type { AssessmentResponses } from '../../data/assessment';
import type { AssessmentScores, DimensionKey, DimensionResult } from './scoring';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
}

export interface AssessmentInterpretation {
  strengths: string[];
  focusAreas: string[];
  recommendations: Recommendation[];
}

const dimensionLanguage: Record<DimensionKey, { strong: string; focus: string }> = {
  identityFoundation: {
    strong: 'Your identity foundation shows a clear control-plane direction and a manageable architecture baseline.',
    focus: 'Clarify the authoritative identity model and reduce platform or directory fragmentation.'
  },
  lifecycle: {
    strong: 'Lifecycle controls appear dependable across onboarding and access revocation.',
    focus: 'Strengthen HR-driven joiner, mover, and leaver automation across downstream applications.'
  },
  automation: {
    strong: 'IAM automation is reducing repetitive operational work and creating repeatable execution.',
    focus: 'Target recurring manual IAM work with governed, supportable automation.'
  },
  governance: {
    strong: 'Access reviews and ownership controls have an established operating rhythm.',
    focus: 'Formalize application ownership, certification scope, and remediation workflows.'
  },
  securityPosture: {
    strong: 'Identity risk and revocation controls provide a useful security baseline.',
    focus: 'Move identity risk review toward a repeatable, evidence-led security posture process.'
  },
  aiNhiReadiness: {
    strong: 'AI and non-human identities have meaningful inventory, ownership, and authentication controls.',
    focus: 'Establish inventory, accountable ownership, and governed authentication for agents and other non-human identities.'
  }
};

const assuranceRecommendations: Record<DimensionKey, { title: string; description: string }> = {
  identityFoundation: {
    title: 'Identity Architecture Assurance',
    description: 'Validate that the current control-plane model remains clear as applications, directories, and business requirements change.'
  },
  lifecycle: {
    title: 'Lifecycle Control Validation',
    description: 'Test joiner, mover, and leaver controls periodically so mature automation remains dependable across downstream systems.'
  },
  automation: {
    title: 'Automation Resilience & Documentation',
    description: 'Document ownership, exception paths, monitoring, and recovery for the automations that now carry operational load.'
  },
  governance: {
    title: 'Governance Operating Model Maintenance',
    description: 'Keep review scope, ownership, evidence, and remediation expectations current as the application portfolio changes.'
  },
  securityPosture: {
    title: 'Identity Security Control Validation',
    description: 'Regularly validate risk signals, revocation paths, and configuration controls against changes in the environment.'
  },
  aiNhiReadiness: {
    title: 'Agent Identity Control Validation',
    description: 'Test that agent inventory, ownership, authentication, and delegated access controls remain complete and traceable.'
  }
};

const dimensionCoverage: Record<DimensionKey, string[]> = {
  identityFoundation: ['okta-modernization', 'identity-consolidation'],
  lifecycle: ['lifecycle-automation'],
  automation: ['operations-automation'],
  governance: ['governance-foundation'],
  securityPosture: ['security-review'],
  aiNhiReadiness: ['agent-governance']
};

const has = (responses: AssessmentResponses, id: string, value: string): boolean => {
  const answer = responses[id];
  return Array.isArray(answer) ? answer.includes(value) : answer === value;
};

const scoreBelow = (scores: AssessmentScores, key: DimensionKey, threshold: number): boolean => {
  const score = scores[key].score;
  return score !== null && score < threshold;
};

export function generateRecommendations(responses: AssessmentResponses, scores: AssessmentScores): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const add = (recommendation: Recommendation) => {
    if (!recommendations.some((item) => item.id === recommendation.id)) recommendations.push(recommendation);
  };

  if (has(responses, 'platforms', 'okta') && has(responses, 'oktaState', 'classic-pending')) {
    add({
      id: 'okta-modernization',
      title: 'Okta Identity Modernization',
      description: 'Define a controlled path from Classic Engine and legacy patterns toward a maintainable Identity Engine foundation.',
      priority: 100
    });
  }

  if (has(responses, 'architecture', 'fragmented') || has(responses, 'architecture', 'highly-fragmented')) {
    add({
      id: 'identity-consolidation',
      title: 'Identity Consolidation & Architecture',
      description: 'Clarify authoritative sources, control-plane boundaries, and the role of adjacent directories and identity platforms.',
      priority: 96
    });
  }

  const aiAdoption = responses.aiAdoption;
  if ((aiAdoption === 'production' || aiAdoption === 'pilots') && scoreBelow(scores, 'aiNhiReadiness', 60)) {
    add({
      id: 'agent-governance',
      title: 'Agent Identity & Governance Architecture',
      description: 'Inventory active agents, assign human owners, and replace ambiguous or persistent access with governed patterns.',
      priority: 94
    });
  }

  if (scoreBelow(scores, 'securityPosture', 60)) {
    add({
      id: 'security-review',
      title: 'Identity Security Posture Review',
      description: 'Establish a repeatable view of configuration risk, access exposure, revocation, and remediation priorities.',
      priority: 90
    });
  }

  if (scoreBelow(scores, 'lifecycle', 60)) {
    add({
      id: 'lifecycle-automation',
      title: 'HR-driven Lifecycle Automation',
      description: 'Use authoritative HR events to improve onboarding, role changes, provisioning, and timely deprovisioning.',
      priority: 86
    });
  }

  if (scoreBelow(scores, 'governance', 60)) {
    add({
      id: 'governance-foundation',
      title: 'Access Governance Foundation',
      description: 'Define ownership, review scope, evidence collection, and remediation workflows for critical access.',
      priority: 82
    });
  }

  if (scoreBelow(scores, 'automation', 60)) {
    add({
      id: 'operations-automation',
      title: 'Okta Workflows / Identity Operations Automation',
      description: 'Prioritize repetitive IAM work that can be automated with visible ownership, controls, and exception handling.',
      priority: 78
    });
  }

  if (recommendations.length < 3 && has(responses, 'platforms', 'okta') && has(responses, 'oktaState', 'identity-engine-debt')) {
    add({
      id: 'okta-optimization',
      title: 'Okta Configuration & Operations Optimization',
      description: 'Reduce accumulated configuration debt and document a supportable Okta operating model.',
      priority: 72
    });
  }

  const fallbackDimensions = Object.values(scores)
    .filter((result): result is DimensionResult & { score: number } => result.score !== null)
    .sort((a, b) => a.score - b.score);

  for (const result of fallbackDimensions) {
    if (recommendations.length >= 3) break;
    if (dimensionCoverage[result.key].some((id) => recommendations.some((item) => item.id === id))) continue;
    const assurance = assuranceRecommendations[result.key];
    add({
      id: `assure-${result.key}`,
      title: result.score >= 60 ? assurance.title : `${result.label} Baseline`,
      description: result.score >= 60 ? assurance.description : dimensionLanguage[result.key].focus,
      priority: 50 - result.score / 10
    });
  }

  return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

export function interpretAssessment(responses: AssessmentResponses, scores: AssessmentScores): AssessmentInterpretation {
  const applicable = Object.values(scores).filter((result) => result.score !== null);
  const strengths = applicable
    .filter((result) => (result.score ?? 0) >= 60)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3)
    .map((result) => dimensionLanguage[result.key].strong);

  if (strengths.length === 0) {
    strengths.push('The assessment establishes a clear baseline, making it easier to sequence improvements instead of treating IAM as one large transformation.');
  }

  const focusAreas = applicable
    .filter((result) => (result.score ?? 0) < 60)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 3)
    .map((result) => dimensionLanguage[result.key].focus);

  if (focusAreas.length === 0) {
    focusAreas.push('Protect the current operating baseline and validate that controls remain consistent as the environment changes.');
  }

  return {
    strengths,
    focusAreas,
    recommendations: generateRecommendations(responses, scores)
  };
}
