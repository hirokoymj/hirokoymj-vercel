/// <reference types="vite/client" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_GOOGLE_MAP_API_KEY: string;
    readonly FIREBASE_API_KEY: string;
    readonly FIREBASE_AUTH_DOMAIN: string;
    readonly FIREBASE_PROJECT_ID: string;
    readonly FIREBASE_STORAGE_BUCKET: string;
    readonly FIREBASE_MESSAGING_SENDER_ID: string;
    readonly FIREBASE_APP_ID: string;
    readonly GEMINI_API_KEY: string;
    readonly OPENWEATHER_API_KEY: string;
  }
}
