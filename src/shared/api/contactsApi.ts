import axios from "axios";

export type Credentials = {
  content: string;
  userName: string;
  userEmail: string;
};

enum FeedStatus {
  NEW = "NEW"
}

export type BackendResponse = {
    userId: string | null;
    id: 2;
    feedbackStatus: FeedStatus;
    sentAt: number;
    resolvedAt: number | null;
} & Credentials;

export const postRequest = async ({
  content,
  userEmail,
  userName,
}: Credentials) => {
  try {
    const res = await axios.post<BackendResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`, {
      content,
      userName,
      userEmail
    });

    return res;
  } catch (err) {
    if (err instanceof Error)
      throw new Error("Failed request, see what's happened: ", err);
  }
};