import { inject } from 'inversify';
import { Context } from 'telegraf';
import { Message } from 'typegram';
import {
  FILE_DOWNLOADER_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTION_SERVICE,
  TELEGRAM_BOT_SERVICE,
  LOGGER_SERVICE,
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
  on,
} from './telegram-bot.decorator';
import { ITelegramBotService } from './telegram-bot.interface';
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

  @on('text')
  public async receiveTextLink(context: Context): Promise<void> {
    try {
      if (context.message && (context.message as Message.TextMessage).text) {
        const textLink = (context.message as Message.TextMessage).text;
        const filePath = await this.remoteVideoExtractionService.extract(textLink);
        const detail = await this.musicRecognitionService.getDetail(filePath);
        const response = this.telegramBotService.detailToHTML(detail);
        context.replyWithHTML(response);
        return;
      }
    } catch (error) {
      if (error instanceof ValidateURLError) {
        context.replyWithHTML(error.message);
      } else if (error instanceof RemoteVideoExtractionError) {
        context.replyWithHTML(error.message);
      } else if (error instanceof MusicRecognitionError) {
        context.replyWithHTML(error.message);
      } else {
        context.replyWithHTML('An error has occurred');
      }
      this.loggerService.log(error);
    }
  }

  @on('message')
  public async receiveFile(context: Context): Promise<void> {
    try {
      if (context.message) {
        const fileId = this.telegramBotService.getFileId(context.message);
        const fileLink = await context.telegram.getFileLink(fileId);
        const filePath = await this.fileDownloaderService.download(fileLink.href);
        const detail = await this.musicRecognitionService.getDetail(filePath as string);
        const response = this.telegramBotService.detailToHTML(detail);
        context.replyWithHTML(response);
        return;
      }
    } catch (error) {
      if (error instanceof FileUploadError) {
        context.replyWithHTML(error.message);
      } else if (error instanceof DownloadFileError) {
        context.replyWithHTML(error.message);
      } else if (error instanceof MusicRecognitionError) {
        context.replyWithHTML(error.message);
      } else {
        context.replyWithHTML('An error has occurred');
      }
      this.loggerService.log(error);
    }
  }
}
