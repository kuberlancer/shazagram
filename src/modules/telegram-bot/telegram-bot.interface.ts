import { MaybeArray } from 'telegraf/typings/composer';
import {
  MessageSubType,
  UpdateType as _UpdateType,
} from 'telegraf/typings/telegram-types';
import { Message } from 'typegram';
import { MusicDetail } from '../music-recognition';

export type UpdateType = MaybeArray<_UpdateType | MessageSubType>;

export interface IBotControllerMethodMetadata {
  method: string;
  updateType: UpdateType;
  propertyKey: string | symbol;
}

export interface ITelegramBotService {
  getFileId(message: Message): string;
  detailToHTML(detail: MusicDetail): string;
}