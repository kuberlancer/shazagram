import { injectable } from 'inversify';
import { IAppConfigService } from './app-config.interface';

@injectable()
export class AppConfigService implements IAppConfigService {
  public readonly TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN ?? '';

  public readonly API_URL = process.env.API_URL ?? 'http://localhost:5000';

  public readonly SENTRY_DSN = process.env.SENTRY_DSN;

  public readonly PORT = process.env.PORT ?? '5000';

  public readonly GOOGLE_ANALYTICS_PROJECT_ID = process.env.GOOGLE_ANALYTICS_PROJECT_ID;

  public isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
}
