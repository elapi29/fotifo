import Image from 'next/image';
import dynamic from 'next/dynamic';

// ⬇️ Import dinámico para que NO se ejecute en el build del servidor
const PhoneSignup = dynamic(() => import('@/components/PhoneSignup'), { ssr: false });

export const revalidate = 3600;

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Editá <span className="text-brand-600">fotos</span> y <span className="text-brand-600">clips</span> en segundos
            </h1>
            <p className="text-lg text-gray-600">
              Filtros pro, stickers, maquillaje virtual y texto — directo en el navegador.
            </p>
            <div className="bg-white/70 backdrop-blur rounded-3xl p-6 shadow-lg border">
              <h2 className="text-xl font-semibold mb-2">Probá Fotifo antes que nadie</h2>
              <p className="text-sm text-gray-600 mb-4">Dejá tu número y te avisamos cuando lancemos.</p>
              <PhoneSignup />
            </div>
            <ul className="text-sm text-gray-600 grid grid-cols-2 gap-3">
              <li>✅ Sin descargas</li>
              <li>✅ Exportación en HD</li>
              <li>✅ Stickers & texto</li>
              <li>✅ Maquillaje virtual</li>
            </ul>
          </div>

          <div className="relative aspect-[4/3] w-full rounded-3xl shadow-xl border overflow-hidden">
            <Image
              src="/og-image.png"
              alt="Interfaz de Fotifo: filtros, capas, stickers y timeline"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-t">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-3">
          {[
            ['Filtros pro', 'Ajustes de color, curvas y LUTs.'],
            ['Stickers & Texto', 'Biblioteca creativa y tipografías limpias.'],
            ['Maquillaje virtual', 'Detección facial en el navegador.']
          ].map(([title, desc]) => (
            <div key={title} className="p-6 bg-white rounded-3xl shadow-sm border">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fotifo. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
