"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const inversify_1 = require("inversify");
const errors_1 = require("./errors");
let TelegramBotService = class TelegramBotService {
    isAudio(message) {
        return message.audio && message.audio.mime_type === 'audio/mpeg';
    }
    isVideo(message) {
        return message.video && message.video.mime_type === 'video/mp4';
    }
    isWebm(message) {
        return message.document && message.document.mime_type === 'video/webm';
    }
    getFileId(message) {
        if (this.isAudio(message)) {
            return message.audio.file_id;
        }
        if (this.isVideo(message)) {
            return message.video.file_id;
        }
        if (this.isWebm(message)) {
            return message.document.file_id;
        }
        throw new errors_1.FileUploadError();
    }
    detailToHTML(detail) {
        const { subtitle, title, url, } = detail;
        return `${subtitle} - ${title}\r\n${url}`;
    }
    updateMessageFactory(context) {
        let message;
        return async (text) => {
            if (!message) {
                message = await context.reply(text);
                return;
            }
            if (context.chat && context.chat.id) {
                await context.telegram.editMessageText(context.chat.id, message.message_id, undefined, text);
            }
        };
    }
};
TelegramBotService = __decorate([
    (0, inversify_1.injectable)()
], TelegramBotService);
exports.TelegramBotService = TelegramBotService;
