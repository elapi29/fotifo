'use client';
import { useEffect, useRef, useState } from 'react';
import { sendOtp } from '@/lib/firebase';
import type { ConfirmationResult } from 'firebase/auth';

export default function PhoneSignup() {
  const [step, setStep] = useState<'phone' | 'otp' | 'done'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const confirmationRef = useRef<ConfirmationResult | null>(null);

  useEffect(() => {
    // Asegura que exista el contenedor de reCAPTCHA
    const el = document.getElementById('recaptcha-container');
    if (!el) {
      const div = document.createElement('div');
      div.id = 'recaptcha-container';
      document.body.appendChild(div);
    }
  }, []);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const confirmation = await sendOtp(phone);
      confirmationRef.current = confirmation;
      setStep('otp');
    } catch (err: any) {
      setError(err?.message ?? 'Error al enviar el código.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const confirmation = confirmationRef.current;
      if (!confirmation) throw new Error('No hay solicitud de verificación activa.');
      await confirmation.confirm(otp);
      setStep('done');
    } catch (err: any) {
      setError(err?.message ?? 'Código inválido.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-3">
          <label htmlFor="phone" className="text-sm font-medium">Ingresá tu teléfono</label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="+54 9 11 1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-2xl border px-4 py-3 shadow-sm focus:ring-2 focus:ring-brand-500"
            aria-describedby="phone-help"
          />
          <p id="phone-help" className="text-xs text-gray-500">Usá formato internacional (ej: +54...).</p>
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-brand-600 text-white px-4 py-3 font-semibold hover:bg-brand-700 transition disabled:opacity-60"
          >{loading ? 'Enviando...' : 'Recibir código por SMS'}</button>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
          <label htmlFor="otp" className="text-sm font-medium">Ingresá el código de 6 dígitos</label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            required
            placeholder="••••••"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="rounded-2xl border px-4 py-3 shadow-sm focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-brand-600 text-white px-4 py-3 font-semibold hover:bg-brand-700 transition disabled:opacity-60"
          >{loading ? 'Verificando...' : 'Confirmar'}</button>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </form>
      )}

      {step === 'done' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
          <p className="font-semibold">¡Listo!</p>
          <p className="text-sm text-green-800">Tu teléfono fue verificado. Te vamos a contactar con las novedades.</p>
        </div>
      )}
    </div>
  );
}
