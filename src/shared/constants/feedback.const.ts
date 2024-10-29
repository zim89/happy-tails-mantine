import type { FeedbackStatus } from '../types/feedback.types';

export const FEEDBACK_STATUS: Record<string, FeedbackStatus> = {
  NEW: 'NEW',
  REVIEWING: 'REVIEWING',
  RESOLVED: 'RESOLVED',
};
