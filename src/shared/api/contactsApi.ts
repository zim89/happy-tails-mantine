import axios from "axios";

export type Credentials = {
  content: string;
  userName: string;
  email: string;
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
  email,
  userName,
}: Credentials) => {
  try {
    const res = await axios.post<Response>(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`, {
      content,
      userName,
      email
    });

    return res;
  } catch (err) {
    if (err instanceof Error)
      throw new Error("Failed request, see what's happened: ", err);
  }
};