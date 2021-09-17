import { injectable } from 'inversify';
import { IAppConfigService } from './app-config.interface';

@injectable()
export class AppConfigService implements IAppConfigService {
  public readonly TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN ?? '';

  public readonly API_URL = process.env.API_URL ?? 'http://localhost:5000';
}