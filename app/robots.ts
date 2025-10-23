import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const host = `https://tu-usuario.github.io${basePath}`;
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${host}/sitemap.xml`
  };
}
