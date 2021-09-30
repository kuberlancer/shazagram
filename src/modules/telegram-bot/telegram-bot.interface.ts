import { MaybeArray } from 'telegraf/typings/composer';
import {
  MessageSubType,
  UpdateType as _UpdateType,
} from 'telegraf/typings/telegram-types';

export type UpdateType = MaybeArray<_UpdateType | MessageSubType>;

export interface IBotControllerMethodMetadata {
  method: string;
  updateType: UpdateType;
  propertyKey: string | symbol;
}
