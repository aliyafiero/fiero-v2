// Product availability and Fiero validation are independent, never interchangeable.
export const productStatuses = {
  ga: { label: 'GA', description: 'Generally available for eligible customers; feature and subscription limitations still apply.' },
  ea: { label: 'EA', description: 'Early Access; verify eligibility and limitations in the customer organization.' },
  beta: { label: 'Beta', description: 'Pre-release capability with limited availability or support.' },
  research: { label: 'Research Release', description: 'Research capability; not a required production dependency.' },
} as const;

export const evidenceStatuses = {
  'lab-tested': { label: 'Lab Tested', description: 'Configured or built in a Fiero or partner sandbox, with recorded scope and results. Not proof of production deployment.' },
  'docs-validated': { label: 'Docs Validated', description: 'Checked against vendor documentation within the stated scope; not tested end to end by Fiero.' },
  'implementation-pattern': { label: 'Implementation Pattern', description: 'Supported by production delivery or representative end-to-end validation. Not automatically a public client case study.' },
} as const;

export type ProductStatus = keyof typeof productStatuses;
export type EvidenceStatus = keyof typeof evidenceStatuses;

// Require a date and source/evidence reference wherever a badge is used.
export type StatusBadgeProps = {
  asOf: string;
  reference: string;
} & (
  | { kind: 'product'; status: ProductStatus }
  | { kind: 'evidence'; status: EvidenceStatus }
);

export function describeStatus(props: StatusBadgeProps) {
  const date = new Date(`${props.asOf}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(props.asOf) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== props.asOf) {
    throw new Error('Status badges require a valid YYYY-MM-DD review date.');
  }
  if (!/^(https:\/\/|\/(?!\/)|#)/.test(props.reference) || props.reference.trim() !== props.reference) {
    throw new Error('Status badges require an HTTPS source, site path or evidence anchor.');
  }
  const definition = props.kind === 'product' ? productStatuses[props.status] : evidenceStatuses[props.status];
  if (!definition) throw new Error('Unknown status for this badge category.');
  return {
    ...definition,
    category: props.kind === 'product' ? 'Product' : 'Evidence',
    dateLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
  };
}
