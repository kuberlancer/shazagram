import { inject } from 'inversify';
import {
  FILE_DOWNLOADER_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTION_SERVICE,
  TELEGRAM_BOT_SERVICE,
  LOGGER_SERVICE,
  messages,
  ANALYTICS_SERVICE,
  goals,
} from '../../constants';
import {
  IFileDownloaderService,
  DownloadFileError,
} from '../file-downloader';
import {
  IMusicRecognitionService,
  MusicRecognitionError,
} from '../music-recognition';
import {
  IRemoteVideoExtractionService,
  ValidateURLError,
  RemoteVideoExtractionError,
} from '../remote-video-extraction';
import {
  botController,
  start,
  on,
} from './telegram-bot.decorator';
import {
  ITelegramBotService,
  ContextWithMessage,
  ContextWithStartPayload,
} from './telegram-bot.interface';
import {
  FileUploadError,
} from './errors';
import {
  ILoggerService,
} from '../logger';
import {
  IAnalyticsService,
} from '../analytics';

@botController()
export class TelegramBotController {
  constructor(
    @inject(TELEGRAM_BOT_SERVICE)
    private readonly telegramBotService: ITelegramBotService,

    @inject(MUSIC_RECOGNITION_SERVICE)
    private readonly musicRecognitionService: IMusicRecognitionService,

    @inject(FILE_DOWNLOADER_SERVICE)
    private readonly fileDownloaderService: IFileDownloaderService,

    @inject(REMOTE_VIDEO_EXTRACTION_SERVICE)
    private readonly remoteVideoExtractionService: IRemoteVideoExtractionService,

    @inject(LOGGER_SERVICE)
    private readonly loggerService: ILoggerService,

    @inject(ANALYTICS_SERVICE)
    private readonly analyticsService: IAnalyticsService,
  ) {}

  @start()
  public async startBot(context: ContextWithMessage & ContextWithStartPayload): Promise<void> {
    const updateMessage = this.telegramBotService.updateMessageFactory(context);
    try {
      await updateMessage('Hello!');
    } catch (error) {
      await updateMessage(messages.UNKNOWN_ERROR);
      this.loggerService.log(error);
    } finally {
      this.analyticsService.event(
        context.message.from.id,
        goals.categories.SHAZAGRAM,
        goals.actions.START_BOT,
        context.startPayload,
      );
    }
  }

  @on('text')
  public async receiveTextLink(context: ContextWithMessage): Promise<void> {
    const updateMessage = this.telegramBotService.updateMessageFactory(context);
    try {
      await updateMessage(messages.EXTRACTING);
      const textLink = context.message.text;
      const filePath = await this.remoteVideoExtractionService.extract(textLink);

      await updateMessage(messages.RECOGNITION);
      const detail = await this.musicRecognitionService.getDetail(filePath);
      const response = this.telegramBotService.detailToHTML(detail);

      await updateMessage(response);
    } catch (error) {
      if (error instanceof ValidateURLError) {
        await updateMessage(error.message);
      } else if (error instanceof RemoteVideoExtractionError) {
        await updateMessage(error.message);
      } else if (error instanceof MusicRecognitionError) {
        await updateMessage(error.message);
      } else {
        await updateMessage(messages.UNKNOWN_ERROR);
      }
      this.loggerService.log(error);
    } finally {
      this.analyticsService.event(
        context.message.from.id,
        goals.categories.SHAZAGRAM,
        goals.actions.SEND_LINK,
      );
    }
  }

  @on('message')
  public async receiveFile(context: ContextWithMessage): Promise<void> {
    const updateMessage = this.telegramBotService.updateMessageFactory(context);
    try {
      await updateMessage(messages.DOWNLOADING);
      const fileId = this.telegramBotService.getFileId(context.message);
      const fileLink = await context.telegram.getFileLink(fileId);
      const filePath = await this.fileDownloaderService.download(fileLink.href);

      await updateMessage(messages.RECOGNITION);
      const detail = await this.musicRecognitionService.getDetail(filePath as string);
      const response = this.telegramBotService.detailToHTML(detail);

      await updateMessage(response);
    } catch (error) {
      if (error instanceof FileUploadError) {
        await updateMessage(error.message);
      } else if (error instanceof DownloadFileError) {
        await updateMessage(error.message);
      } else if (error instanceof MusicRecognitionError) {
        await updateMessage(error.message);
      } else {
        await updateMessage(messages.UNKNOWN_ERROR);
      }
      this.loggerService.log(error);
    } finally {
      this.analyticsService.event(
        context.message.from.id,
        goals.categories.SHAZAGRAM,
        goals.actions.SEND_FILE,
      );
    }
  }
}
