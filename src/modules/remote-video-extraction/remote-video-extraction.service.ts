import { inject, injectable } from 'inversify';
import { YOUTUBE_VIDEO_EXTRACTION_SERVICE } from '../../constants';
import {
  IRemoteVideoExtractionService,
  IRemoteVideoExtractionStrategy,
} from './remote-video-extraction.interface';
import {
  RemoteVideoExtractionError,
  ValidateURLError,
} from './errors';

@injectable()
export class RemoteVideoExtractionService implements IRemoteVideoExtractionService {
  constructor(
    @inject(YOUTUBE_VIDEO_EXTRACTION_SERVICE)
    private readonly youtubeVideoExtractionService: IRemoteVideoExtractionStrategy,
  ) {}

  validateURL(url: string): void {
    const regExp = /(https?:\/\/[^\s]+)/g;
    if (!regExp.test(url)) {
      throw new ValidateURLError();
    }
  }

  public extract(url: string): Promise<string> {
    this.validateURL(url);

    if (this.youtubeVideoExtractionService.isAppropriateStrategy(url)) {
      return this.youtubeVideoExtractionService.extract(url);
    }

    throw new RemoteVideoExtractionError();
  }
}
