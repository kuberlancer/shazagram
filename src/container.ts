import { Container } from 'inversify';
import {
  MUSIC_RECOGNITION_SERVICE,
  YOUTUBE_MUSIC_RECOGNITION_SERVICE,
} from './constants';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
} from './modules/music-recognition/music-recognition.interface';
import { MusicRecognitionService } from './modules/music-recognition/music-recognition.service';
import { YoutubeMusicRecognitionService } from './modules/music-recognition/strategies/youtube-music-recognition.service';

const container = new Container();

container
  .bind<IMusicRecognitionService>(MUSIC_RECOGNITION_SERVICE)
  .to(MusicRecognitionService)
  .inSingletonScope();

container
  .bind<IMusicRecognitionStrategy>(YOUTUBE_MUSIC_RECOGNITION_SERVICE)
  .to(YoutubeMusicRecognitionService)
  .inSingletonScope();

export { container };
