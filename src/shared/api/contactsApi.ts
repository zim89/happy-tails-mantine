import { AxiosError } from "axios";
import axios from "@/shared/lib/interceptor";

export type Credentials = {
  content: string;
  userName: string;
  userEmail: string;
  imageSrc: string;
};

enum FeedStatus {
  NEW = "NEW"
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
  imageSrc
}: Credentials) => {
  try {
    const res = await axios.post<Response>(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`, {
      content,
      userName,
      userEmail,
      imageSrc
    });

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err?.response?.data.error);
    }
  }
};