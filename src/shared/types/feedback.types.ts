export type FeedbackStatus = 'NEW' | 'REVIEWING' | 'RESOLVED';

export type Feedback = {
  id: number;
  userEmail: string;
  userName: string;
  content: string;
  imageSrc?: string[];
  feedbackStatus: FeedbackStatus;
  starred: boolean;
  replyOfManager?: string | null;
  managerRepliedAt?: number | null;
  sentAt: number;
  resolvedAt: number | null;
};

export type CreateFeedbackPayload = {
  userEmail: string;
  userName: string;
  content: string;
  imageSrc?: string[];
};
