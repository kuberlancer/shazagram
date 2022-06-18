"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBotController = exports.getBotControllerMethodListFromMetadata = void 0;
const constants_1 = require("../constants");
function getBotControllerMethodListFromMetadata() {
    const methodListMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.telegramBotMethodList, Reflect) || [];
    return methodListMetadata;
}
exports.getBotControllerMethodListFromMetadata = getBotControllerMethodListFromMetadata;
function registerBotController(bot, botController) {
    const botMethodList = getBotControllerMethodListFromMetadata();
    botMethodList.forEach(({ method, updateType, propertyKey }) => {
        if (method === 'start') {
            bot.start(botController[propertyKey].bind(botController));
        }
        else if (method === 'on' && updateType) {
            bot.on(updateType, botController[propertyKey].bind(botController));
        }
    });
}
exports.registerBotController = registerBotController;
