'use client';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ''
};

function isConfigured() {
  // Requerimos al menos apiKey + authDomain + appId para auth por teléfono
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.appId
  );
}

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

function ensureAuth(): Auth {
  if (!isConfigured()) {
    const err: any = new Error('Firebase no está configurado');
    err.code = 'FIREBASE_NOT_CONFIGURED';
    throw err;
  }
  if (!_app) {
    _app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  if (!_auth) {
    _auth = getAuth(_app);
  }
  return _auth!;
}

export function getOrCreateRecaptcha(containerId = 'recaptcha-container') {
  if (typeof window === 'undefined') return null;
  let auth: Auth;
  try {
    auth = ensureAuth();
  } catch {
    return null; // sin configurar: no crear recaptcha
  }
  const existing = (window as any).recaptchaVerifier as RecaptchaVerifier | undefined;
  if (existing) return existing;
  const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

export async function sendOtp(phone: string) {
  const verifier = getOrCreateRecaptcha();
  if (!verifier) {
    const err: any = new Error('Firebase no está configurado. Agregá tus claves en .env.local.');
    err.code = 'FIREBASE_NOT_CONFIGURED';
    throw err;
  }
  const auth = ensureAuth();
  return await signInWithPhoneNumber(auth, phone, verifier);
}
