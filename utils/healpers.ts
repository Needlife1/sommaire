// export const isDev = process.env.NODE_ENV === 'development';

// export const ORIGIN_URL = isDev ? 'http://localhost:3000' : '';

export function getSiteUrl(): string {
  // приоритет: явная переменная → vercel url → локалка
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  return env || 'http://localhost:3000';
}
