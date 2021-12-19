import { inject, injectable } from 'inversify';
import { YOUTUBE_VIDEO_EXTRACTOR_SERVICE } from '../../constants';
import {
  IRemoteVideoExtractorService,
  IRemoteVideoExtractorStrategy,
} from './remote-video-extractor.interface';

@injectable()
export class RemoteVideoExtractorService implements IRemoteVideoExtractorService {
  constructor(
    @inject(YOUTUBE_VIDEO_EXTRACTOR_SERVICE)
    private readonly youtubeVideoExtractorService: IRemoteVideoExtractorStrategy,
  ) {}

  isLink(url: string): boolean {
    return /(https?:\/\/[^\s]+)/g
      .test(url);
  }

  public extract(url: string): Promise<string> {
    if (!this.isLink(url)) throw Error('This is not link');

    if (this.youtubeVideoExtractorService.isAppropriateStrategy(url)) {
      return this.youtubeVideoExtractorService.extract(url);
    }

    throw new Error('This link is not supported');
  }
}
