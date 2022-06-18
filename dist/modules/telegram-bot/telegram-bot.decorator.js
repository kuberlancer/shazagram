"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = exports.start = exports.botController = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../../constants");
function botController() {
    return function (target) {
        (0, inversify_1.decorate)((0, inversify_1.injectable)(), target);
        return target;
    };
}
exports.botController = botController;
function botMethod(method, updateType) {
    return function (target, propertyKey) {
        let methodList = [];
        if (!Reflect.hasMetadata(constants_1.METADATA_KEY.telegramBotMethodList, Reflect)) {
            Reflect.defineMetadata(constants_1.METADATA_KEY.telegramBotMethodList, methodList, Reflect);
        }
        else {
            methodList = Reflect.getMetadata(constants_1.METADATA_KEY.telegramBotMethodList, Reflect);
        }
        methodList.push({
            method,
            updateType,
            propertyKey,
        });
        return target;
    };
}
function start() {
    return botMethod('start');
}
exports.start = start;
function on(updateType) {
    return botMethod('on', updateType);
}
exports.on = on;
