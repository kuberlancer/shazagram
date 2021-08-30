import { Container } from 'inversify';
import { MUSIC_RECOGNITION_SERVICE } from './constants';
import { IMusicRecognitionService } from './modules/music-recognition/music-recognition.interface';
import { MusicRecognitionService } from './modules/music-recognition/music-recognition.service';

const container = new Container();

container
  .bind<IMusicRecognitionService>(MUSIC_RECOGNITION_SERVICE)
  .to(MusicRecognitionService)
  .inSingletonScope();

export { container };
