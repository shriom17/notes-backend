export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax' as const,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
