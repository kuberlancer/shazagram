import { inject } from 'inversify';
import { Context } from 'telegraf';
import { Update } from 'typegram';
import { MUSIC_RECOGNITION_SERVICE } from '../../constants';
import { IMusicRecognitionService } from '../music-recognition';
import {
  botController,
  on,
} from './telegram-bot.decorator';

@botController()
export class TelegramBotController {
  constructor(
    @inject(MUSIC_RECOGNITION_SERVICE)
    private readonly musicRecognitionService: IMusicRecognitionService,
  ) {}

  @on('text')
  public receive(context: Context<Update>): void {
    context.replyWithHTML('<b>Hello</b>');
  }
}
