"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goals = exports.messages = exports.FRAGMENT_DURATION = exports.UPLOAD_FOLDER = exports.METADATA_KEY = exports.TELEGRAM_BOT_CONTROLLER = exports.ANALYTICS_SERVICE = exports.LOGGER_SERVICE = exports.FILE_DOWNLOADER_SERVICE = exports.TELEGRAM_BOT_SERVICE = exports.APP_CONFIG_SERVICE = exports.SHAZAM_MUSIC_RECOGNITION_SERVICE = exports.YOUTUBE_VIDEO_EXTRACTION_SERVICE = exports.REMOTE_VIDEO_EXTRACTION_SERVICE = exports.MUSIC_RECOGNITION_SERVICE = void 0;
exports.MUSIC_RECOGNITION_SERVICE = Symbol.for('MUSIC_RECOGNITION_SERVICE');
exports.REMOTE_VIDEO_EXTRACTION_SERVICE = Symbol.for('REMOTE_VIDEO_EXTRACTION_SERVICE');
exports.YOUTUBE_VIDEO_EXTRACTION_SERVICE = Symbol.for('YOUTUBE_VIDEO_EXTRACTION_SERVICE');
exports.SHAZAM_MUSIC_RECOGNITION_SERVICE = Symbol.for('SHAZAM_MUSIC_RECOGNITION_SERVICE');
exports.APP_CONFIG_SERVICE = Symbol.for('APP_CONFIG_SERVICE');
exports.TELEGRAM_BOT_SERVICE = Symbol.for('TELEGRAM_BOT_SERVICE');
exports.FILE_DOWNLOADER_SERVICE = Symbol.for('FILE_DOWNLOADER_SERVICE');
exports.LOGGER_SERVICE = Symbol.for('LOGGER_SERVICE');
exports.ANALYTICS_SERVICE = Symbol.for('ANALYTICS_SERVICE');
exports.TELEGRAM_BOT_CONTROLLER = Symbol.for('TELEGRAM_BOT_CONTROLLER');
exports.METADATA_KEY = {
    telegramBot: Symbol.for('TELEGRAM_BOT_METADATA_KEY'),
    telegramBotMethodList: Symbol.for('TELEGRAM_BOT_METHOD_LIST_METADATA_KEY'),
};
exports.UPLOAD_FOLDER = `${__dirname}/uploads`;
exports.FRAGMENT_DURATION = '5';
exports.messages = {
    EXTRACTING: 'Extracting from remote server...',
    RECOGNITION: 'Recognition...',
    DOWNLOADING: 'Downloading file...',
    UNKNOWN_ERROR: 'An error has occurred',
};
exports.goals = {
    categories: {
        SHAZAGRAM: 'SHAZAGRAM',
    },
    actions: {
        START_BOT: 'START_BOT',
        SEND_LINK: 'SEND_LINK',
        SEND_FILE: 'SEND_FILE',
    },
};
