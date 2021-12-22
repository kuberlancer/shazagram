export interface IAppConfigService {
  TELEGRAM_API_TOKEN: string;
  API_URL: string;
  PORT: string;
  SENTRY_DSN: string;
  isProduction(): boolean;
}
