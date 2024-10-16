type OAuthError = Error & {
  status: number;
};

export const isOAthError = (err: unknown): err is OAuthError => {
  return err instanceof Error && 'status' in err;
};
