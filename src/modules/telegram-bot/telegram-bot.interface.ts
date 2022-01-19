import type { Telegraf, Context } from 'telegraf';
import { MaybeArray } from 'telegraf/typings/composer';
import {
  MessageSubType,
  UpdateType as _UpdateType,
} from 'telegraf/typings/telegram-types';
import { Message } from 'typegram';
import { MusicDetail } from '../music-recognition';

export type UpdateType = MaybeArray<_UpdateType | MessageSubType>;

export type Method = keyof Telegraf;

export interface IBotControllerMethodMetadata {
  method: Method;
  updateType?: UpdateType;
  propertyKey: string | symbol;
}

export interface ITelegramBotService {
  getFileId(message: Message): string;
  detailToHTML(detail: MusicDetail): string;
  updateMessageFactory(context: Context): (text: string) => Promise<void>;
}

export type ContextWithMessage = Context & {
  message: Message.TextMessage
};
