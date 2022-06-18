"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotController = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../../constants");
const file_downloader_1 = require("../file-downloader");
const music_recognition_1 = require("../music-recognition");
const remote_video_extraction_1 = require("../remote-video-extraction");
const telegram_bot_decorator_1 = require("./telegram-bot.decorator");
const errors_1 = require("./errors");
let TelegramBotController = class TelegramBotController {
    constructor(telegramBotService, musicRecognitionService, fileDownloaderService, remoteVideoExtractionService, loggerService, analyticsService) {
        this.telegramBotService = telegramBotService;
        this.musicRecognitionService = musicRecognitionService;
        this.fileDownloaderService = fileDownloaderService;
        this.remoteVideoExtractionService = remoteVideoExtractionService;
        this.loggerService = loggerService;
        this.analyticsService = analyticsService;
    }
    async startBot(context) {
        const updateMessage = this.telegramBotService.updateMessageFactory(context);
        try {
            await updateMessage('Hello!');
        }
        catch (error) {
            await updateMessage(constants_1.messages.UNKNOWN_ERROR);
            this.loggerService.log(error);
        }
        finally {
            this.analyticsService.event(context.message.from.id, constants_1.goals.categories.SHAZAGRAM, constants_1.goals.actions.START_BOT, context.startPayload);
        }
    }
    async receiveTextLink(context) {
        const updateMessage = this.telegramBotService.updateMessageFactory(context);
        try {
            await updateMessage(constants_1.messages.EXTRACTING);
            const textLink = context.message.text;
            const filePath = await this.remoteVideoExtractionService.extract(textLink);
            await updateMessage(constants_1.messages.RECOGNITION);
            const detail = await this.musicRecognitionService.getDetail(filePath);
            const response = this.telegramBotService.detailToHTML(detail);
            await updateMessage(response);
        }
        catch (error) {
            if (error instanceof remote_video_extraction_1.ValidateURLError) {
                await updateMessage(error.message);
            }
            else if (error instanceof remote_video_extraction_1.RemoteVideoExtractionError) {
                await updateMessage(error.message);
            }
            else if (error instanceof music_recognition_1.MusicRecognitionError) {
                await updateMessage(error.message);
            }
            else {
                await updateMessage(constants_1.messages.UNKNOWN_ERROR);
            }
            this.loggerService.log(error);
        }
        finally {
            this.analyticsService.event(context.message.from.id, constants_1.goals.categories.SHAZAGRAM, constants_1.goals.actions.SEND_LINK);
        }
    }
    async receiveFile(context) {
        const updateMessage = this.telegramBotService.updateMessageFactory(context);
        try {
            await updateMessage(constants_1.messages.DOWNLOADING);
            const fileId = this.telegramBotService.getFileId(context.message);
            const fileLink = await context.telegram.getFileLink(fileId);
            const filePath = await this.fileDownloaderService.download(fileLink.href);
            await updateMessage(constants_1.messages.RECOGNITION);
            const detail = await this.musicRecognitionService.getDetail(filePath);
            const response = this.telegramBotService.detailToHTML(detail);
            await updateMessage(response);
        }
        catch (error) {
            if (error instanceof errors_1.FileUploadError) {
                await updateMessage(error.message);
            }
            else if (error instanceof file_downloader_1.DownloadFileError) {
                await updateMessage(error.message);
            }
            else if (error instanceof music_recognition_1.MusicRecognitionError) {
                await updateMessage(error.message);
            }
            else {
                await updateMessage(constants_1.messages.UNKNOWN_ERROR);
            }
            this.loggerService.log(error);
        }
        finally {
            this.analyticsService.event(context.message.from.id, constants_1.goals.categories.SHAZAGRAM, constants_1.goals.actions.SEND_FILE);
        }
    }
};
__decorate([
    (0, telegram_bot_decorator_1.start)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TelegramBotController.prototype, "startBot", null);
__decorate([
    (0, telegram_bot_decorator_1.on)('text'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TelegramBotController.prototype, "receiveTextLink", null);
__decorate([
    (0, telegram_bot_decorator_1.on)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TelegramBotController.prototype, "receiveFile", null);
TelegramBotController = __decorate([
    (0, telegram_bot_decorator_1.botController)(),
    __param(0, (0, inversify_1.inject)(constants_1.TELEGRAM_BOT_SERVICE)),
    __param(1, (0, inversify_1.inject)(constants_1.MUSIC_RECOGNITION_SERVICE)),
    __param(2, (0, inversify_1.inject)(constants_1.FILE_DOWNLOADER_SERVICE)),
    __param(3, (0, inversify_1.inject)(constants_1.REMOTE_VIDEO_EXTRACTION_SERVICE)),
    __param(4, (0, inversify_1.inject)(constants_1.LOGGER_SERVICE)),
    __param(5, (0, inversify_1.inject)(constants_1.ANALYTICS_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], TelegramBotController);
exports.TelegramBotController = TelegramBotController;
