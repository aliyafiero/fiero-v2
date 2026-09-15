import type { AssessmentResponses } from '../../data/assessment';
import type { AssessmentScores } from './scoring';
import type { Recommendation } from './recommendations';

export interface AssessmentContact {
  name: string;
  email: string;
  company: string;
  role: string;
  context: string;
  reviewRequested: boolean;
}

export interface AssessmentSubmission {
  contact: AssessmentContact;
  responses: AssessmentResponses;
  scores: AssessmentScores;
  recommendations: Recommendation[];
  timestamp: string;
}

export type SubmissionResult =
  | { ok: true; message: string }
  | { ok: false; reason: 'not-configured' | 'request-failed'; message: string };

const formEndpoint = String(import.meta.env.PUBLIC_FORMSPREE_ENDPOINT ?? '').trim();

export function isSubmissionConfigured(): boolean {
  return Boolean(formEndpoint);
}

export async function submitAssessment(payload: AssessmentSubmission): Promise<SubmissionResult> {
  if (!formEndpoint) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'Result delivery is not configured in this environment yet. Your assessment results remain available above.'
    };
  }

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Fiero identity assessment — ${payload.contact.company}`,
        name: payload.contact.name,
        email: payload.contact.email,
        company: payload.contact.company,
        role: payload.contact.role,
        context: payload.contact.context,
        reviewRequested: payload.contact.reviewRequested,
        assessmentResponses: payload.responses,
        dimensionScores: payload.scores,
        recommendations: payload.recommendations,
        timestamp: payload.timestamp
      })
    });

    if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);

    return {
      ok: true,
      message: 'Your assessment profile has been sent. Thank you.'
    };
  } catch {
    return {
      ok: false,
      reason: 'request-failed',
      message: 'We could not send your profile right now. Your results are still available above; please try again later.'
    };
  }
}
