import { inject, injectable } from 'inversify';
import { YOUTUBE_MUSIC_RECOGNITION_SERVICE } from '../../constants';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
  MusicDetail,
} from './music-recognition.interface';

@injectable()
export class MusicRecognitionService implements IMusicRecognitionService {
  constructor(
    @inject(YOUTUBE_MUSIC_RECOGNITION_SERVICE)
    private readonly youtubeMusicRecognitionService: IMusicRecognitionStrategy,
  ) {}

  getDetail(url: string): MusicDetail {
    if (this.youtubeMusicRecognitionService.isAppropriateStrategy(url)) {
      console.log('This is YouTube video');
    }

    return {
      name: url,
    };
  }
}
