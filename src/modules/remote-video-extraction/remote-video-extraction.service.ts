import { inject, injectable } from 'inversify';
import { YOUTUBE_VIDEO_EXTRACTION_SERVICE } from '../../constants';
import {
  IRemoteVideoExtractionService,
  IRemoteVideoExtractionStrategy,
} from './remote-video-extraction.interface';

@injectable()
export class RemoteVideoExtractionService implements IRemoteVideoExtractionService {
  constructor(
    @inject(YOUTUBE_VIDEO_EXTRACTION_SERVICE)
    private readonly youtubeVideoExtractionService: IRemoteVideoExtractionStrategy,
  ) {}

  isLink(url: string): boolean {
    return /(https?:\/\/[^\s]+)/g
      .test(url);
  }

  public extract(url: string): Promise<string> {
    if (!this.isLink(url)) throw Error('This is not link');

    if (this.youtubeVideoExtractionService.isAppropriateStrategy(url)) {
      return this.youtubeVideoExtractionService.extract(url);
    }

    throw new Error('This link is not supported');
  }
}
