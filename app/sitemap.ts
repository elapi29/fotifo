import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const host = `https://tu-usuario.github.io${basePath}`;
  return [
    { url: `${host}/`, priority: 1 }
  ];
}
