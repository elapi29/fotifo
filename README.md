# Fotifo — Landing estática (Next.js + Tailwind + Firebase Phone Auth)

## Requisitos
- Node 18+
- Cuenta de Firebase (habilitar Authentication → Phone, y configurar dominios autorizados). Añadí `https://tu-usuario.github.io` y, si corresponde, la subcarpeta.

## Variables de entorno (`.env.local`)
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_APP_ID=1:XXXX:web:YYYY
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXXX
# Para GitHub Pages (repo p.ej. /fotifo):
NEXT_PUBLIC_BASE_PATH=/fotifo
```

## Desarrollo
```bash
npm i
npm run dev
```

## Build estático
```bash
npm run build
npm run export
# salida en ./out
```

## Deploy a GitHub Pages (branch gh-pages)
```bash
npm run deploy
```

### Buenas prácticas incluidas
- Export estático (`output: 'export'`)
- `basePath`/`assetPrefix` para subcarpetas de GH Pages
- Tailwind 3 + accesibilidad (labels, focus-visible)
- SEO: Metadata, OG/Twitter, `robots.ts`, `sitemap.ts`, JSON-LD
- Performance: imágenes responsivas y pocas dependencias
- Seguridad/Abuso: reCAPTCHA invisible de Firebase y verificación OTP
