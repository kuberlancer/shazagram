import { inject, injectable } from 'inversify';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { APP_CONFIG_SERVICE } from '../../constants';
import { ILoggerService } from './logger.interface';
import { IAppConfigService } from '../app-config';

@injectable()
export class LoggerService implements ILoggerService {
  constructor(
    @inject(APP_CONFIG_SERVICE)
    private readonly appConfig: IAppConfigService,
  ) {
    Sentry.init({
      dsn: appConfig.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
  }

  public log(...args: unknown[]): void {
    if (this.appConfig.isProduction()) {
      const error = args[0] as Error;

      const transaction = Sentry.startTransaction({
        op: error.name,
        name: error.message,
      });

      Sentry.captureException(error);

      transaction.finish();
    } else {
      console.log(...args);
    }
  }
}
