type IWindow = Window & typeof globalThis & {
  configOverride: {
    [key: string]: string;
  };
}

const configOverride = (window as IWindow).configOverride ?? {};

const isDev = true || configOverride.isDev;

export const api = import.meta.env.VITE_API_URL;
const appUrl = import.meta.env.VITE_FRONTEND_URL;
export const config = {
  api,
  appUrl,
  appBaseUrl: '/',
  defaultAppLang: 'en',
  supportedLanguages: ['en'],
  baseUrl: import.meta.env.BASE_URL,
  isDev,
  ...configOverride,
};
