import { AxiosError } from 'axios';
import axios from '@/shared/lib/interceptor';
import { API_URL } from '../constants/env.const';

export type Credentials = {
  content: string;
  userName: string;
  userEmail: string;
  imageSrc: string[];
};

enum FeedStatus {
  NEW = 'NEW',
}

export type Response = {
  userId: string | null;
  id: number;
  feedbackStatus: FeedStatus;
  sentAt: number;
  resolvedAt: number | null;
} & Credentials;

export const postRequest = async ({
  content,
  userEmail,
  userName,
  imageSrc,
}: Credentials) => {
  const res = await axios.post<Response>(`${API_URL}/feedback`, {
    content,
    userName,
    userEmail,
    imageSrc,
  });

  return res;
};
