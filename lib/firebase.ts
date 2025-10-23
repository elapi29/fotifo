'use client';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export function getOrCreateRecaptcha(containerId = 'recaptcha-container') {
  if (typeof window === 'undefined') return null;
  const existing = (window as any).recaptchaVerifier as RecaptchaVerifier | undefined;
  if (existing) return existing;
  const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

export async function sendOtp(phone: string) {
  const verifier = getOrCreateRecaptcha();
  if (!verifier) throw new Error('reCAPTCHA no disponible.');
  return await signInWithPhoneNumber(auth, phone, verifier);
}
