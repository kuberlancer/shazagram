import { inject } from 'inversify';
import { Context } from 'telegraf';
import { Message } from 'typegram';
import {
  FILE_DOWNLOADER_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  REMOTE_VIDEO_EXTRACTOR_SERVICE,
  TELEGRAM_BOT_SERVICE,
} from '../../constants';
import { IFileDownloaderService } from '../file-downloader';
import { IMusicRecognitionService } from '../music-recognition';
import { IRemoteVideoExtractorService } from '../remote-video-extractor';
import {
  botController,
  on,
} from './telegram-bot.decorator';
import { ITelegramBotService } from './telegram-bot.interface';

@botController()
export class TelegramBotController {
  constructor(
    @inject(TELEGRAM_BOT_SERVICE)
    private readonly telegramBotService: ITelegramBotService,

    @inject(MUSIC_RECOGNITION_SERVICE)
    private readonly musicRecognitionService: IMusicRecognitionService,

    @inject(FILE_DOWNLOADER_SERVICE)
    private readonly fileDownloaderService: IFileDownloaderService,

    @inject(REMOTE_VIDEO_EXTRACTOR_SERVICE)
    private readonly remoteVideoExtractorService: IRemoteVideoExtractorService,
  ) {}

  @on('text')
  public async receiveTextLink(context: Context): Promise<void> {
    try {
      if (context.message && (context.message as Message.TextMessage).text) {
        const textLink = (context.message as Message.TextMessage).text;
        const filePath = await this.remoteVideoExtractorService.extract(textLink);
        const detail = await this.musicRecognitionService.getDetail(filePath);
        const response = this.telegramBotService.detailToHTML(detail);
        context.replyWithHTML(response);
        return;
      }
    } catch (error) {
      console.log(error);
      context.replyWithHTML('Error');
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
      console.log(error);
      context.replyWithHTML('Error');
    }
  }
}
