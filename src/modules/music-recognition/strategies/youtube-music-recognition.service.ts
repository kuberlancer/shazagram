import { injectable } from 'inversify';
import { IMusicRecognitionStrategy } from '../music-recognition.interface';

@injectable()
export class YoutubeMusicRecognitionService implements IMusicRecognitionStrategy {
  public isAppropriateStrategy(url: string): boolean {
    return /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g
      .test(url);
  }
}
