import { injectable } from 'inversify';
import { ILoggerService } from './logger.interface';

@injectable()
export class LoggerService implements ILoggerService {
  public log(...args: unknown[]): void {
    console.log(...args);
  }
}
