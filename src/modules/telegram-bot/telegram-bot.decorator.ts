import { decorate, injectable } from 'inversify';
import {
  UpdateType,
  IBotControllerMethodMetadata,
  Method,
} from './telegram-bot.interface';
import { METADATA_KEY } from '../../constants';

export function botController(): ClassDecorator {
  return function (target) {
    decorate(injectable(), target);

    return target;
  };
}

function botMethod(method: Method, updateType?: UpdateType): MethodDecorator {
  return function (target, propertyKey) {
    let methodList: Array<IBotControllerMethodMetadata> = [];

    if (!Reflect.hasMetadata(METADATA_KEY.telegramBotMethodList, Reflect)) {
      Reflect.defineMetadata(
        METADATA_KEY.telegramBotMethodList,
        methodList,
        Reflect,
      );
    } else {
      methodList = Reflect.getMetadata(
        METADATA_KEY.telegramBotMethodList,
        Reflect,
      );
    }

    methodList.push({
      method,
      updateType,
      propertyKey,
    });

    return target;
  };
}

export function start(): MethodDecorator {
  return botMethod('start');
}

export function on(updateType: UpdateType): MethodDecorator {
  return botMethod('on', updateType);
}
