import { inject } from 'inversify';
import {
  FILE_DOWNLOADER_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTION_SERVICE,
  TELEGRAM_BOT_SERVICE,
  LOGGER_SERVICE,
  MESSAGES,
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
} from './telegram-bot.interface';
import {
  FileUploadError,
} from './errors';
import {
  ILoggerService,
} from '../logger';

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
  ) {}

  @start()
  public async startBot(context: ContextWithMessage): Promise<void> {
    const updateMessage = this.telegramBotService.updateMessageFactory(context);
    try {
      await updateMessage('Hello!');
    } catch (error) {
      await updateMessage((error as Error).message);
      this.loggerService.log(error);
    }
  }

  @on('text')
  public async receiveTextLink(context: ContextWithMessage): Promise<void> {
    const updateMessage = this.telegramBotService.updateMessageFactory(context);
    try {
      await updateMessage(MESSAGES.EXTRACTING);
      const textLink = context.message.text;
      const filePath = await this.remoteVideoExtractionService.extract(textLink);

      await updateMessage(MESSAGES.RECOGNITION);
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
        await updateMessage(MESSAGES.UNKNOWN_ERROR);
      }
      this.loggerService.log(error);
    }
  }

  @on('message')
  public async receiveFile(context: ContextWithMessage): Promise<void> {
    const updateMessage = this.telegramBotService.updateMessageFactory(context);
    try {
      await updateMessage(MESSAGES.DOWNLOADING);
      const fileId = this.telegramBotService.getFileId(context.message);
      const fileLink = await context.telegram.getFileLink(fileId);
      const filePath = await this.fileDownloaderService.download(fileLink.href);

      await updateMessage(MESSAGES.RECOGNITION);
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
        await updateMessage(MESSAGES.UNKNOWN_ERROR);
      }
      this.loggerService.log(error);
    }
  }
}
