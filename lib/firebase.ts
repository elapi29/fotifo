'use client';

/**
 * Carga PEREZOSA de Firebase: no importamos 'firebase/app' ni 'firebase/auth'
 * hasta que el usuario realmente solicite el OTP.
 * Esto evita errores como auth/invalid-api-key cuando no hay .env configurado.
 */

type FirebaseApp = any;
type Auth = any;
type RecaptchaVerifierType = any;

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _recaptcha: RecaptchaVerifierType | null = null;

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ''
  };
}

function isConfigured(cfg: ReturnType<typeof getFirebaseConfig>) {
  // Requerimos al menos apiKey + authDomain + appId para Auth por teléfono
  return Boolean(cfg.apiKey && cfg.authDomain && cfg.appId);
}

async function ensureAuth(): Promise<Auth> {
  const cfg = getFirebaseConfig();
  if (!isConfigured(cfg)) {
    const err: any = new Error('Firebase no está configurado. Agregá tus claves en .env.local o en GitHub Actions.');
    err.code = 'FIREBASE_NOT_CONFIGURED';
    throw err;
  }

  // Import dinámico de los módulos (NO en top-level)
  const appMod = await import('firebase/app');
  const authMod = await import('firebase/auth');

  const { getApps, initializeApp } = appMod;
  const { getAuth } = authMod;

  if (!_app) {
    _app = getApps().length ? getApps()[0] : initializeApp(cfg);
  }
  if (!_auth) {
    _auth = getAuth(_app);
  }
  return _auth!;
}

export async function getOrCreateRecaptcha(containerId = 'recaptcha-container') {
  if (typeof window === 'undefined') return null;

  // Si no hay config, no intentes crear reCAPTCHA todavía
  const cfg = getFirebaseConfig();
  if (!isConfigured(cfg)) return null;

  const auth = await ensureAuth();
  if ((window as any).recaptchaVerifier) {
    return (window as any).recaptchaVerifier as RecaptchaVerifierType;
  }

  // Import dinámico de RecaptchaVerifier
  const { RecaptchaVerifier } = await import('firebase/auth');
  const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' }) as RecaptchaVerifierType;
  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

export async function sendOtp(phone: string) {
  const verifier = await getOrCreateRecaptcha();
  if (!verifier) {
    const err: any = new Error('Firebase no está configurado. Agregá tus claves y volvé a intentar.');
    err.code = 'FIREBASE_NOT_CONFIGURED';
    throw err;
  }
  const auth = await ensureAuth();
  const { signInWithPhoneNumber } = await import('firebase/auth');
  return await signInWithPhoneNumber(auth, phone, verifier);
}


