// app/sitemap.ts
import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const rawRoutes = [
    '',
    '/terms-and-conditions',
    '/ad-tracker',
    '/attribution',
    '/contact',
    '/drive',
    '/paymentResult',
    '/scan&amp;spin',
  ];

  return rawRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
