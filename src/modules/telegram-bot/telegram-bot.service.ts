import { injectable } from 'inversify';
import { Message } from 'typegram';
import { Context } from 'telegraf';
import { MusicDetail } from '../music-recognition';
import { ITelegramBotService } from './telegram-bot.interface';
import {
  FileUploadError,
} from './errors';

@injectable()
export class TelegramBotService implements ITelegramBotService {
  public isAudio<T extends Message.AudioMessage>(message: T): boolean {
    return message.audio && message.audio.mime_type === 'audio/mpeg';
  }

  public isVideo<T extends Message.VideoMessage>(message: T): boolean {
    return message.video && message.video.mime_type === 'video/mp4';
  }

  public isWebm<T extends Message.DocumentMessage>(message: T): boolean {
    return message.document && message.document.mime_type === 'video/webm';
  }

  public getFileId(message: Message): string {
    if (this.isAudio(message as Message.AudioMessage)) {
      return (message as Message.AudioMessage).audio.file_id;
    }

    if (this.isVideo(message as Message.VideoMessage)) {
      return (message as Message.VideoMessage).video.file_id;
    }

    if (this.isWebm(message as Message.DocumentMessage)) {
      return (message as Message.DocumentMessage).document.file_id;
    }

    throw new FileUploadError();
  }

  public detailToHTML(detail: MusicDetail): string {
    const {
      subtitle,
      title,
      url,
    } = detail;
    return `${subtitle} - ${title}\r\n${url}`;
  }

  public updateMessageFactory(context: Context) {
    let message: Message.TextMessage | undefined;

    return async (text: string) => {
      if (!message) {
        message = await context.reply(text);
        return;
      }
      if (context.chat && context.chat.id) {
        await context.telegram.editMessageText(
          context.chat.id,
          message.message_id,
          undefined,
          text,
        );
      }
    };
  }
}
