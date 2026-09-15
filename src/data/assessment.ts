export type AnswerValue = string | string[];
export type AssessmentResponses = Record<string, AnswerValue>;

export interface AssessmentOption {
  value: string;
  label: string;
}

export interface AssessmentCondition {
  questionId: string;
  operator: 'equals' | 'includes' | 'oneOf' | 'notEquals';
  value: string | string[];
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  type: 'single' | 'multi';
  options: readonly AssessmentOption[];
  required?: boolean;
  when?: AssessmentCondition;
}

export interface AssessmentSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  questions: readonly AssessmentQuestion[];
  when?: AssessmentCondition;
}

const option = (value: string, label: string): AssessmentOption => ({ value, label });

export const assessmentSections: readonly AssessmentSection[] = [
  {
    id: 'priorities',
    eyebrow: 'Priorities',
    title: 'Start with what needs to improve.',
    description: 'Select every priority that applies. Your answers shape the assessment, not a sales form.',
    questions: [
      {
        id: 'priorities',
        prompt: 'What are you trying to improve?',
        type: 'multi',
        options: [
          option('modernize-okta', 'Modernize an existing Okta environment'),
          option('migrate-consolidate', 'Migrate or consolidate identity platforms'),
          option('onboarding-offboarding', 'Improve onboarding / offboarding'),
          option('automate-operations', 'Automate IAM operations'),
          option('access-governance', 'Improve access governance'),
          option('identity-security', 'Strengthen identity security'),
          option('ai-nhi', 'Prepare for AI agents / non-human identities'),
          option('assess-current', 'Not sure — assess our current environment')
        ]
      }
    ]
  },
  {
    id: 'foundation',
    eyebrow: 'Identity foundation',
    title: 'Map the current control plane.',
    description: 'We only need a high-level architecture view—never credentials, exports, or production access.',
    questions: [
      {
        id: 'platforms',
        prompt: 'Which identity platforms are part of your environment today?',
        type: 'multi',
        options: [
          option('okta', 'Okta'),
          option('entra', 'Microsoft Entra ID'),
          option('ad-adfs', 'Active Directory / ADFS'),
          option('google', 'Google Workspace / Cloud Identity'),
          option('jumpcloud', 'JumpCloud'),
          option('other-legacy', 'Other / legacy identity platform'),
          option('not-sure', 'Not sure')
        ]
      },
      {
        id: 'workforceSize',
        prompt: 'Approximately how many workforce identities do you manage?',
        type: 'single',
        options: [
          option('under-50', '<50'),
          option('50-250', '50–250'),
          option('250-500', '250–500'),
          option('500-1000', '500–1,000'),
          option('1000-3000', '1,000–3,000'),
          option('3000-5000', '3,000–5,000'),
          option('5000-10000', '5,000–10,000'),
          option('10000-plus', '10,000+')
        ]
      },
      {
        id: 'architecture',
        prompt: 'How would you describe your current identity architecture?',
        type: 'single',
        options: [
          option('centralized', 'Centralized — one clearly defined identity control plane and source model'),
          option('mostly-centralized', 'Mostly centralized — one primary IdP with some exceptions'),
          option('fragmented', 'Fragmented — multiple directories, IdPs or sources require significant coordination'),
          option('highly-fragmented', 'Highly fragmented — identity varies significantly across teams/business units'),
          option('unsure', 'Unsure')
        ]
      }
    ]
  },
  {
    id: 'lifecycle',
    eyebrow: 'Lifecycle',
    title: 'Understand how identity changes flow.',
    description: 'This looks at the joiner, mover, and leaver controls that shape daily operational reliability.',
    questions: [
      {
        id: 'identityTrigger',
        prompt: 'What primarily initiates a new employee identity today?',
        type: 'single',
        options: [
          option('hris', 'HRIS automatically'),
          option('active-directory', 'Active Directory'),
          option('it-manual', 'IT ticket / manual IT process'),
          option('manager-workflow', 'Manager/request workflow'),
          option('multiple', 'Multiple sources/processes'),
          option('unsure', 'Unsure')
        ]
      },
      {
        id: 'hrSystem',
        prompt: 'Which HR system?',
        type: 'single',
        when: { questionId: 'identityTrigger', operator: 'equals', value: 'hris' },
        options: [
          option('workday', 'Workday'),
          option('ukg', 'UKG / UltiPro'),
          option('successfactors', 'SuccessFactors'),
          option('adp', 'ADP'),
          option('bamboohr', 'BambooHR'),
          option('oracle-hcm', 'Oracle HCM'),
          option('other', 'Other')
        ]
      },
      {
        id: 'onboarding',
        prompt: 'Which best describes employee onboarding today?',
        type: 'single',
        options: [
          option('manual', 'Mostly manual — IT creates most accounts and access manually'),
          option('partial', 'Partially automated — core identity is automated, but significant app/group work remains'),
          option('mostly-automated', 'Mostly automated — HR events trigger identity creation and most provisioning'),
          option('mature', 'Mature — HR-driven lifecycle, role-based assignment and downstream provisioning are broadly automated')
        ]
      },
      {
        id: 'offboarding',
        prompt: 'When someone leaves, how reliably is access revoked across applications?',
        type: 'single',
        options: [
          option('immediate', 'Immediately and automatically across most systems'),
          option('mostly-automated', 'Mostly automated, with some exceptions'),
          option('mixed', 'Combination of automation and manual tickets'),
          option('manual', 'Mostly manual'),
          option('not-confident', "We're not confident")
        ]
      }
    ]
  },
  {
    id: 'automation',
    eyebrow: 'Automation',
    title: 'Locate the recurring operational burden.',
    description: 'Tools matter, but the more useful signal is how much routine IAM work still depends on people.',
    questions: [
      {
        id: 'automationTools',
        prompt: 'What do you use for IAM automation today?',
        type: 'multi',
        options: [
          option('okta-workflows', 'Okta Workflows'),
          option('power-automate', 'Power Automate / Logic Apps'),
          option('servicenow', 'ServiceNow workflows'),
          option('scripts', 'PowerShell / Python / custom scripts'),
          option('terraform', 'Terraform / Infrastructure as Code'),
          option('other', 'Other automation platform'),
          option('manual', 'Mostly manual')
        ]
      },
      {
        id: 'manualIntervention',
        prompt: 'How much repetitive IAM work still requires human intervention?',
        type: 'single',
        options: [
          option('very-little', 'Very little'),
          option('some', 'Some'),
          option('significant', 'A significant amount'),
          option('most', 'Most IAM operations'),
          option('hard-to-tell', 'Hard to tell')
        ]
      },
      {
        id: 'manualBurden',
        prompt: 'Where is the biggest manual burden?',
        type: 'multi',
        required: false,
        when: { questionId: 'manualIntervention', operator: 'oneOf', value: ['significant', 'most'] },
        options: [
          option('onboarding', 'Onboarding'),
          option('offboarding', 'Offboarding'),
          option('movers', 'Movers / role changes'),
          option('app-provisioning', 'App provisioning'),
          option('access-requests', 'Access requests'),
          option('cleanup', 'Inactive account / license cleanup'),
          option('reporting', 'Reporting / audit evidence'),
          option('security-response', 'Security response'),
          option('other', 'Other')
        ]
      }
    ]
  },
  {
    id: 'governance',
    eyebrow: 'Governance & security',
    title: 'Evaluate ownership, review, and risk controls.',
    description: 'These questions separate documented intent from repeatable operational controls.',
    questions: [
      {
        id: 'governanceMaturity',
        prompt: 'How mature is access governance today?',
        type: 'single',
        options: [
          option('automated', 'Automated recurring reviews across critical applications'),
          option('regular-manual', 'Regular reviews, but significant manual preparation/remediation'),
          option('selected-apps', 'Reviews for selected regulated/critical applications only'),
          option('spreadsheet', 'Mostly spreadsheet/manual'),
          option('none', 'No formal access certification process'),
          option('unsure', 'Unsure')
        ]
      },
      {
        id: 'accessOwnership',
        prompt: 'Is application and access ownership clearly defined?',
        type: 'single',
        options: [
          option('broadly', 'Yes, broadly'),
          option('critical-only', 'For critical applications only'),
          option('inconsistent', 'Inconsistently'),
          option('no', 'No'),
          option('unsure', 'Unsure')
        ]
      },
      {
        id: 'riskAssessment',
        prompt: 'How do you assess identity configuration and access risk?',
        type: 'single',
        options: [
          option('continuous', 'Continuous / automated monitoring'),
          option('periodic-tooling', 'Periodic tooling-based assessments'),
          option('periodic-manual', 'Periodic manual review'),
          option('audit-incident', 'Primarily during audits or incidents'),
          option('none', 'No defined process'),
          option('unsure', 'Unsure')
        ]
      }
    ]
  },
  {
    id: 'okta',
    eyebrow: 'Okta environment',
    title: 'Review the Okta foundation.',
    description: 'This section appears because Okta is part of the environment you described.',
    when: { questionId: 'platforms', operator: 'includes', value: 'okta' },
    questions: [
      {
        id: 'oktaState',
        prompt: 'Which best describes your Okta environment today?',
        type: 'single',
        options: [
          option('identity-engine-maintained', 'Identity Engine and actively maintained'),
          option('identity-engine-debt', 'Identity Engine, but accumulated legacy configuration/process debt'),
          option('modernizing', 'Currently modernizing / upgrading the environment'),
          option('classic-pending', 'Classic Engine / modernization still pending'),
          option('recent', 'Recently implemented'),
          option('unsure', 'Unsure')
        ]
      }
    ]
  },
  {
    id: 'ai-nhi',
    eyebrow: 'AI & non-human identity',
    title: 'Place emerging identities in context.',
    description: 'A high-level view is enough. Do not provide agent names, credentials, secrets, or configuration data.',
    questions: [
      {
        id: 'aiAdoption',
        prompt: 'Where are AI agents or agentic workflows today?',
        type: 'single',
        options: [
          option('production', 'Already in production'),
          option('pilots', 'Active pilots'),
          option('department-experimentation', 'Department-level experimentation'),
          option('early-planning', 'Early planning'),
          option('not-explored', 'Not currently being explored'),
          option('unsure', 'Unsure')
        ]
      },
      {
        id: 'nhiInventory',
        prompt: 'Could your IAM/security team identify the AI agents and other non-human identities currently accessing enterprise systems?',
        type: 'single',
        when: { questionId: 'aiAdoption', operator: 'notEquals', value: 'not-explored' },
        options: [
          option('centrally', 'Yes, centrally'),
          option('mostly', 'Mostly'),
          option('partially', 'Partially'),
          option('no', 'No'),
          option('unsure', 'Unsure')
        ]
      },
      {
        id: 'nhiOwnership',
        prompt: 'Is a human owner clearly accountable for each production agent / non-human identity?',
        type: 'single',
        when: { questionId: 'aiAdoption', operator: 'notEquals', value: 'not-explored' },
        options: [
          option('yes', 'Yes'),
          option('mostly', 'Mostly'),
          option('sometimes', 'Sometimes'),
          option('no', 'No'),
          option('unsure', 'Unsure')
        ]
      },
      {
        id: 'nhiAuthentication',
        prompt: 'How do these identities primarily authenticate?',
        type: 'single',
        when: { questionId: 'aiAdoption', operator: 'notEquals', value: 'not-explored' },
        options: [
          option('managed-identities', 'Managed/workload identities'),
          option('oauth', 'OAuth applications'),
          option('service-accounts', 'Service accounts'),
          option('api-keys', 'API keys / long-lived secrets'),
          option('mixed', 'Mixed approaches'),
          option('unsure', 'Unsure')
        ]
      }
    ]
  }
] as const;

export function conditionMatches(condition: AssessmentCondition | undefined, responses: AssessmentResponses): boolean {
  if (!condition) return true;
  const answer = responses[condition.questionId];
  const expected = condition.value;

  if (condition.operator === 'includes') {
    return Array.isArray(answer) && answer.includes(String(expected));
  }

  if (condition.operator === 'oneOf') {
    return Array.isArray(expected) && typeof answer === 'string' && expected.includes(answer);
  }

  if (condition.operator === 'notEquals') {
    return typeof answer === 'string' && answer !== expected;
  }

  return answer === expected;
}

export function getVisibleSections(responses: AssessmentResponses): readonly AssessmentSection[] {
  return assessmentSections.filter((section) => conditionMatches(section.when, responses));
}

export function getVisibleQuestions(section: AssessmentSection, responses: AssessmentResponses): readonly AssessmentQuestion[] {
  return section.questions.filter((question) => conditionMatches(question.when, responses));
}
