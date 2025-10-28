// Centraliza el acceso a las variables de entorno y el objeto de configuración
// WARNING: Nunca pongas valores sensibles en código fuente. Usa `.env.local` o
// GitHub Secrets / OIDC para valores de producción.

type OptString = string | undefined;

function getEnv(key: string, required = false): OptString {
	const v = process.env[key];
	if (required && (v === undefined || v === "")) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return v;
}

export const env = {
	NEXT_PUBLIC_APP_URL: getEnv('NEXT_PUBLIC_APP_URL') ?? 'http://localhost:3000',
	NEXT_PUBLIC_APP_NAME: getEnv('NEXT_PUBLIC_APP_NAME') ?? 'Motans',
	NEXT_PUBLIC_APP_DESCRIPTION: getEnv('NEXT_PUBLIC_APP_DESCRIPTION') ?? 'Local Business and Services Platform',
	NEXT_PUBLIC_ENABLE_SOCIAL_SHARING: getEnv('NEXT_PUBLIC_ENABLE_SOCIAL_SHARING') ?? 'true',
	NEXT_PUBLIC_ENABLE_ANALYTICS: getEnv('NEXT_PUBLIC_ENABLE_ANALYTICS') ?? 'false',

	// Firebase public config (safe to expose on the client as long as rules are correct)
	NEXT_PUBLIC_FIREBASE_API_KEY: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY'),
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
	NEXT_PUBLIC_FIREBASE_APP_ID: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID'),
	NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: getEnv('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
};

export const firebaseConfig = {
	apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
	authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
	projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
	storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
	messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
	appId: env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
	measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
};

// Helper to assert required runtime envs used by server-only code
export function assertServerEnv() {
	// example: throw if project id missing in server builds
	if (!env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
		throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is required');
	}
}
