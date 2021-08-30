import { injectable } from 'inversify';
import { IMusicRecognitionService } from './music-recognition.interface';

@injectable()
export class MusicRecognitionService implements IMusicRecognitionService {
  getName(url: string): string {
    return `Song is called: ${url}`;
  }
}
