export type FeedbackStatus = 'NEW' | 'REVIEWING' | 'RESOLVED';

export type Feedback = {
  id: number;
  userEmail: string;
  userName: string;
  content: string;
  imageSrc?: string;
  feedbackStatus: FeedbackStatus;
  replyOfManager?: string;
  sentAt: string;
  resolvedAt: string | null;
};

export type CreateFeedbackPayload = {
  userEmail: string;
  userName: string;
  content: string;
  imageSrc?: string[];
};
