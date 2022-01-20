import { inject, injectable } from 'inversify';
import ua from 'universal-analytics';
import {
  APP_CONFIG_SERVICE,
  LOGGER_SERVICE,
} from '../../constants';
import { IAppConfigService } from '../app-config';
import { ILoggerService } from '../logger';
import { IAnalyticsService } from './analytics.interface';

@injectable()
export class AnalyticsService implements IAnalyticsService {
  constructor(
    @inject(APP_CONFIG_SERVICE)
    private readonly appConfig: IAppConfigService,

    @inject(LOGGER_SERVICE)
    private readonly loggerService: ILoggerService,
  ) {}

  public event(
    userId: number,
    category: string,
    action: string,
    label?: string,
  ): void {
    const { GOOGLE_ANALYTICS_PROJECT_ID: projectId } = this.appConfig;

    const visitor = ua(projectId, userId.toString(), {
      strictCidFormat: false,
    });

    if (this.appConfig.isProduction()) {
      visitor.event({
        ec: category,
        ea: action,
        el: label,
      }, (error) => {
        if (error) {
          this.loggerService.log(error);
        }
      }).send();
    } else {
      console.table({
        category,
        action,
        label,
      });
    }
  }
}
