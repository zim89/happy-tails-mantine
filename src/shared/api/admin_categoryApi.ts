import axios from 'axios';

export type Credentials = {
  name: string;
  image: {
    path: string;
    name: string;
  };
};

export type BackendResponse = {
  id: number;
} & Credentials;

export const postRequest = async ({ name, image }: Credentials) => {
  try {
    const res = await axios.post<BackendResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        name,
        imgSrc: image.path,
      }
    );

    return res;
  } catch (err) {
    if (err instanceof Error)
      throw new Error("Failed request, see what's happened: ", err);
  }
};

export const putRequest = async ({ name, image }: Credentials) => {
  try {
    const res = await axios.put<BackendResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        name,
        imgSrc: image.path,
      }
    );

    return res;
  } catch (err) {
    if (err instanceof Error)
      throw new Error("Failed request, see what's happened: ", err);
  }
}