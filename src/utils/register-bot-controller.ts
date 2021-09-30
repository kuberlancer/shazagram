import { Context, Telegraf } from 'telegraf';
import { METADATA_KEY } from '../constants';
import { IBotControllerMethodMetadata } from '../modules/telegram-bot';

export function getBotControllerMethodListFromMetadata(): Array<IBotControllerMethodMetadata> {
  const methodListMetadata: Array<IBotControllerMethodMetadata> = Reflect.getMetadata(
    METADATA_KEY.telegramBotMethodList,
    Reflect,
  ) || [];
  return methodListMetadata;
}

export function registerBotController(
  bot: Telegraf<Context>,
  botController: any,
): void {
  const botMethodList = getBotControllerMethodListFromMetadata();
  botMethodList.forEach(({ method, updateType, propertyKey }) => {
    if (method === 'on') {
      bot.on(updateType, botController[propertyKey].bind(botController));
    }
  });
}
