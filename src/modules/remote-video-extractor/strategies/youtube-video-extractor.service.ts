import { injectable } from 'inversify';
import { IRemoteVideoExtractorStrategy } from '../remote-video-extractor.interface';

@injectable()
export class YoutubeVideoExtractorService implements IRemoteVideoExtractorStrategy {
  public isAppropriateStrategy(url: string): boolean {
    return /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g
      .test(url);
  }
}
