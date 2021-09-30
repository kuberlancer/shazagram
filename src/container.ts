import { Container } from 'inversify';
import {
  APP_CONFIG_SERVICE,
  MUSIC_RECOGNITION_CONTROLLER,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTOR_SERVICE,
  SHAZAM_MUSIC_RECOGNITION_SERVICE,
  YOUTUBE_VIDEO_EXTRACTOR_SERVICE,
  TELEGRAM_BOT_CONTROLLER,
} from './constants';
import {
  IAppConfigService,
  AppConfigService,
} from './modules/app-config';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
  MusicRecognitionService,
  ShazamMusicRecognitionService,
  MusicRecognitionController,
} from './modules/music-recognition';
import {
  IRemoteVideoExtractorService,
  IRemoteVideoExtractorStrategy,
  RemoteVideoExtractorService,
  YoutubeVideoExtractorService,
} from './modules/remote-video-extractor';
import {
  TelegramBotController,
} from './modules/telegram-bot';

const container = new Container();

container
  .bind(MUSIC_RECOGNITION_CONTROLLER)
  .to(MusicRecognitionController)
  .inSingletonScope();

container
  .bind(TELEGRAM_BOT_CONTROLLER)
  .to(TelegramBotController)
  .inSingletonScope();

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
  .bind<IMusicRecognitionStrategy>(SHAZAM_MUSIC_RECOGNITION_SERVICE)
  .to(ShazamMusicRecognitionService)
  .inSingletonScope();

container
  .bind<IAppConfigService>(APP_CONFIG_SERVICE)
  .to(AppConfigService)
  .inSingletonScope();

export { container };
