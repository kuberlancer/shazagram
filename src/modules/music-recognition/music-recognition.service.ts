import { injectable } from 'inversify';
import {
  IMusicRecognitionService,
  MusicDetail,
} from './music-recognition.interface';

@injectable()
export class MusicRecognitionService implements IMusicRecognitionService {
  getDetail(url: string): MusicDetail {
    return {
      name: 'Unknown music',
    };
  }
}
