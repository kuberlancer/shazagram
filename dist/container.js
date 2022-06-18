"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("./constants");
const app_config_1 = require("./modules/app-config");
const file_downloader_1 = require("./modules/file-downloader");
const music_recognition_1 = require("./modules/music-recognition");
const remote_video_extraction_1 = require("./modules/remote-video-extraction");
const telegram_bot_1 = require("./modules/telegram-bot");
const logger_1 = require("./modules/logger");
const analytics_1 = require("./modules/analytics");
const container = new inversify_1.Container();
exports.container = container;
container
    .bind(constants_1.TELEGRAM_BOT_CONTROLLER)
    .to(telegram_bot_1.TelegramBotController)
    .inSingletonScope();
container
    .bind(constants_1.MUSIC_RECOGNITION_SERVICE)
    .to(music_recognition_1.MusicRecognitionService)
    .inSingletonScope();
container
    .bind(constants_1.REMOTE_VIDEO_EXTRACTION_SERVICE)
    .to(remote_video_extraction_1.RemoteVideoExtractionService)
    .inSingletonScope();
container
    .bind(constants_1.YOUTUBE_VIDEO_EXTRACTION_SERVICE)
    .to(remote_video_extraction_1.YoutubeVideoExtractionService)
    .inSingletonScope();
container
    .bind(constants_1.SHAZAM_MUSIC_RECOGNITION_SERVICE)
    .to(music_recognition_1.ShazamMusicRecognitionService)
    .inSingletonScope();
container
    .bind(constants_1.APP_CONFIG_SERVICE)
    .to(app_config_1.AppConfigService)
    .inSingletonScope();
container
    .bind(constants_1.TELEGRAM_BOT_SERVICE)
    .to(telegram_bot_1.TelegramBotService)
    .inSingletonScope();
container
    .bind(constants_1.FILE_DOWNLOADER_SERVICE)
    .to(file_downloader_1.FileDownloaderService)
    .inSingletonScope();
container
    .bind(constants_1.LOGGER_SERVICE)
    .to(logger_1.LoggerService)
    .inSingletonScope();
container
    .bind(constants_1.ANALYTICS_SERVICE)
    .to(analytics_1.AnalyticsService)
    .inSingletonScope();
