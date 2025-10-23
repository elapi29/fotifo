import type { Metadata } from 'next';
import './globals.css';

const siteName = 'Fotifo — Editá fotos y clips';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const baseUrl = `https://tu-usuario.github.io${basePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: '%s · Fotifo'
  },
  description: 'Editá fotos y videoclips online: filtros, stickers, maquillaje virtual y texto. Sin descargas.',
  applicationName: siteName,
  keywords: ['editor de fotos', 'editor de video', 'stickers', 'maquillaje virtual', 'agregar texto', 'landing'],
  authors: [{ name: 'Tu Nombre', url: baseUrl }],
  alternates: { canonical: baseUrl },
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName,
    title: siteName,
    description: 'Editá fotos y videoclips online con filtros, stickers y más.',
    images: ['/og-image.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'Editá fotos y videoclips online con filtros, stickers y más.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  },
  other: {
    'theme-color': '#2f74ff'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased text-gray-900 bg-white">
        {children}
        {/* Contenedor global para reCAPTCHA invisible */}
        <div id="recaptcha-container" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: siteName,
              applicationCategory: 'MultimediaApplication',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
            })
          }}
        />
      </body>
    </html>
  );
}
