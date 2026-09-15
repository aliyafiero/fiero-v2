import type { AssessmentResponses } from '../../data/assessment';

export type DimensionKey =
  | 'identityFoundation'
  | 'lifecycle'
  | 'automation'
  | 'governance'
  | 'securityPosture'
  | 'aiNhiReadiness';

export type MaturityBand = 'Mature' | 'Established' | 'Developing' | 'Foundational' | 'Not yet applicable';

export interface DimensionResult {
  key: DimensionKey;
  label: string;
  score: number | null;
  band: MaturityBand;
}

export type AssessmentScores = Record<DimensionKey, DimensionResult>;

const single = (responses: AssessmentResponses, id: string): string => {
  const value = responses[id];
  return typeof value === 'string' ? value : '';
};

const multi = (responses: AssessmentResponses, id: string): string[] => {
  const value = responses[id];
  return Array.isArray(value) ? value : [];
};

const mapped = (value: string, values: Record<string, number>, fallback = 25): number => values[value] ?? fallback;
const average = (...values: number[]): number => Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
const weighted = (...values: Array<[number, number]>): number => Math.round(values.reduce((sum, [score, weight]) => sum + score * weight, 0));

export function bandFor(score: number): Exclude<MaturityBand, 'Not yet applicable'> {
  if (score >= 80) return 'Mature';
  if (score >= 60) return 'Established';
  if (score >= 40) return 'Developing';
  return 'Foundational';
}

function dimension(key: DimensionKey, label: string, score: number): DimensionResult {
  return { key, label, score, band: bandFor(score) };
}

function platformScore(responses: AssessmentResponses): number {
  const platforms = multi(responses, 'platforms');
  if (platforms.length === 0 || (platforms.length === 1 && platforms[0] === 'not-sure')) return 25;
  if (platforms.includes('okta')) return 100;
  if (platforms.includes('entra')) return 80;
  if (platforms.includes('google') || platforms.includes('jumpcloud')) return 65;
  if (platforms.includes('ad-adfs')) return 55;
  return 35;
}

function identityFoundationScore(responses: AssessmentResponses): number {
  const architecture = mapped(single(responses, 'architecture'), {
    centralized: 100,
    'mostly-centralized': 78,
    fragmented: 42,
    'highly-fragmented': 18,
    unsure: 30
  });
  const platforms = platformScore(responses);
  const hasOkta = multi(responses, 'platforms').includes('okta');

  if (!hasOkta) return weighted([architecture, 0.72], [platforms, 0.28]);

  const okta = mapped(single(responses, 'oktaState'), {
    'identity-engine-maintained': 100,
    'identity-engine-debt': 58,
    modernizing: 70,
    'classic-pending': 25,
    recent: 78,
    unsure: 40
  }, 40);

  return weighted([architecture, 0.55], [platforms, 0.2], [okta, 0.25]);
}

function lifecycleScore(responses: AssessmentResponses): number {
  const trigger = mapped(single(responses, 'identityTrigger'), {
    hris: 100,
    'active-directory': 68,
    'manager-workflow': 42,
    multiple: 34,
    'it-manual': 20,
    unsure: 25
  });
  const onboarding = mapped(single(responses, 'onboarding'), {
    mature: 100,
    'mostly-automated': 82,
    partial: 52,
    manual: 18
  });
  const offboarding = mapped(single(responses, 'offboarding'), {
    immediate: 100,
    'mostly-automated': 80,
    mixed: 52,
    manual: 20,
    'not-confident': 15
  });

  return average(trigger, onboarding, offboarding);
}

function automationScore(responses: AssessmentResponses): number {
  const tools = multi(responses, 'automationTools');
  let toolsScore = 30;

  if (tools.includes('manual') && tools.length === 1) {
    toolsScore = 15;
  } else if (tools.length > 0) {
    const maturity = tools.map((tool) => mapped(tool, {
      'okta-workflows': 95,
      terraform: 90,
      'power-automate': 76,
      servicenow: 76,
      scripts: 62,
      other: 58,
      manual: 20
    }));
    toolsScore = Math.min(100, Math.max(...maturity) + Math.min(10, (tools.length - 1) * 3));
  }

  const intervention = mapped(single(responses, 'manualIntervention'), {
    'very-little': 100,
    some: 74,
    significant: 40,
    most: 14,
    'hard-to-tell': 30
  });

  return weighted([toolsScore, 0.45], [intervention, 0.55]);
}

function governanceScore(responses: AssessmentResponses): number {
  const reviews = mapped(single(responses, 'governanceMaturity'), {
    automated: 100,
    'regular-manual': 75,
    'selected-apps': 58,
    spreadsheet: 34,
    none: 10,
    unsure: 25
  });
  const ownership = mapped(single(responses, 'accessOwnership'), {
    broadly: 100,
    'critical-only': 75,
    inconsistent: 45,
    no: 12,
    unsure: 25
  });

  return weighted([reviews, 0.62], [ownership, 0.38]);
}

function securityScore(responses: AssessmentResponses): number {
  const risk = mapped(single(responses, 'riskAssessment'), {
    continuous: 100,
    'periodic-tooling': 80,
    'periodic-manual': 55,
    'audit-incident': 30,
    none: 10,
    unsure: 25
  });
  const ownership = mapped(single(responses, 'accessOwnership'), {
    broadly: 100,
    'critical-only': 75,
    inconsistent: 45,
    no: 12,
    unsure: 25
  });
  const revocation = mapped(single(responses, 'offboarding'), {
    immediate: 100,
    'mostly-automated': 80,
    mixed: 52,
    manual: 20,
    'not-confident': 15
  });

  return weighted([risk, 0.6], [ownership, 0.2], [revocation, 0.2]);
}

function aiReadinessScore(responses: AssessmentResponses): DimensionResult {
  if (single(responses, 'aiAdoption') === 'not-explored') {
    return { key: 'aiNhiReadiness', label: 'AI / NHI Readiness', score: null, band: 'Not yet applicable' };
  }

  const inventory = mapped(single(responses, 'nhiInventory'), {
    centrally: 100,
    mostly: 76,
    partially: 48,
    no: 10,
    unsure: 25
  });
  const ownership = mapped(single(responses, 'nhiOwnership'), {
    yes: 100,
    mostly: 76,
    sometimes: 48,
    no: 10,
    unsure: 25
  });
  const authentication = mapped(single(responses, 'nhiAuthentication'), {
    'managed-identities': 100,
    oauth: 82,
    mixed: 55,
    'service-accounts': 42,
    'api-keys': 18,
    unsure: 25
  });

  return dimension('aiNhiReadiness', 'AI / NHI Readiness', average(inventory, ownership, authentication));
}

export function scoreAssessment(responses: AssessmentResponses): AssessmentScores {
  const identityFoundation = dimension('identityFoundation', 'Identity Foundation', identityFoundationScore(responses));
  const lifecycle = dimension('lifecycle', 'Lifecycle', lifecycleScore(responses));
  const automation = dimension('automation', 'Automation', automationScore(responses));
  const governance = dimension('governance', 'Governance', governanceScore(responses));
  const securityPosture = dimension('securityPosture', 'Security Posture', securityScore(responses));
  const aiNhiReadiness = aiReadinessScore(responses);

  return { identityFoundation, lifecycle, automation, governance, securityPosture, aiNhiReadiness };
}
