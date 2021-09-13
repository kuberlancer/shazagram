import { Container } from 'inversify';
import {
  AUDD_MUSIC_RECOGNITION_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTOR_SERVICE,
  YOUTUBE_VIDEO_EXTRACTOR_SERVICE,
} from './constants';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
} from './modules/music-recognition/music-recognition.interface';
import {
  MusicRecognitionService,
} from './modules/music-recognition/music-recognition.service';
import { AudDMusicRecognitionService } from './modules/music-recognition/strategies/audd-music-recognition.service';
import {
  IRemoteVideoExtractorService,
  IRemoteVideoExtractorStrategy,
} from './modules/remote-video-extractor/remote-video-extractor.interface';
import { RemoteVideoExtractorService } from './modules/remote-video-extractor/remote-video-extractor.service';
import {
  YoutubeVideoExtractorService,
} from './modules/remote-video-extractor/strategies/youtube-video-extractor.service';

const container = new Container();

container
  .bind<IMusicRecognitionService>(MUSIC_RECOGNITION_SERVICE)
  .to(MusicRecognitionService)
  .inSingletonScope();

container
  .bind<IRemoteVideoExtractorService>(REMOTE_VIDEO_EXTRACTOR_SERVICE)
  .to(RemoteVideoExtractorService)
  .inSingletonScope();

container
  .bind<IRemoteVideoExtractorStrategy>(YOUTUBE_VIDEO_EXTRACTOR_SERVICE)
  .to(YoutubeVideoExtractorService)
  .inSingletonScope();

container
  .bind<IMusicRecognitionStrategy>(AUDD_MUSIC_RECOGNITION_SERVICE)
  .to(AudDMusicRecognitionService)
  .inSingletonScope();

export { container };
