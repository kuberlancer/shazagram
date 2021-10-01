import { inject } from 'inversify';
import { Context } from 'telegraf';
import {
  FILE_DOWNLOADER_SERVICE,
  MUSIC_RECOGNITION_SERVICE,
  TELEGRAM_BOT_SERVICE,
} from '../../constants';
import { IFileDownloaderService } from '../file-downloader';
import { IMusicRecognitionService } from '../music-recognition';
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
  ) {}

  @on('text')
  public receiveText(context: Context): void {
    context.replyWithHTML('<b>Hello</b>');
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
      context.replyWithHTML(String(error));
    }
  }
}
