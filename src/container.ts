import { Container } from 'inversify';
import {
  APP_CONFIG_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTION_SERVICE,
  SHAZAM_MUSIC_RECOGNITION_SERVICE,
  YOUTUBE_VIDEO_EXTRACTION_SERVICE,
  TELEGRAM_BOT_CONTROLLER,
  TELEGRAM_BOT_SERVICE,
  FILE_DOWNLOADER_SERVICE,
} from './constants';
import {
  IAppConfigService,
  AppConfigService,
} from './modules/app-config';
import {
  IFileDownloaderService,
  FileDownloaderService,
} from './modules/file-downloader';
import {
  IMusicRecognitionService,
  IMusicRecognitionStrategy,
  MusicRecognitionService,
  ShazamMusicRecognitionService,
} from './modules/music-recognition';
import {
  IRemoteVideoExtractionService,
  IRemoteVideoExtractionStrategy,
  RemoteVideoExtractionService,
  YoutubeVideoExtractionService,
} from './modules/remote-video-extraction';
import {
  ITelegramBotService,
  TelegramBotController,
  TelegramBotService,
} from './modules/telegram-bot';

const container = new Container();

container
  .bind(TELEGRAM_BOT_CONTROLLER)
  .to(TelegramBotController)
  .inSingletonScope();

container
  .bind<IMusicRecognitionService>(MUSIC_RECOGNITION_SERVICE)
  .to(MusicRecognitionService)
  .inSingletonScope();

container
  .bind<IRemoteVideoExtractionService>(REMOTE_VIDEO_EXTRACTION_SERVICE)
  .to(RemoteVideoExtractionService)
  .inSingletonScope();

container
  .bind<IRemoteVideoExtractionStrategy>(YOUTUBE_VIDEO_EXTRACTION_SERVICE)
  .to(YoutubeVideoExtractionService)
  .inSingletonScope();

container
  .bind<IMusicRecognitionStrategy>(SHAZAM_MUSIC_RECOGNITION_SERVICE)
  .to(ShazamMusicRecognitionService)
  .inSingletonScope();

container
  .bind<IAppConfigService>(APP_CONFIG_SERVICE)
  .to(AppConfigService)
  .inSingletonScope();

container
  .bind<ITelegramBotService>(TELEGRAM_BOT_SERVICE)
  .to(TelegramBotService)
  .inSingletonScope();

container
  .bind<IFileDownloaderService>(FILE_DOWNLOADER_SERVICE)
  .to(FileDownloaderService)
  .inSingletonScope();

export { container };
