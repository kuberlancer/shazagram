export const MUSIC_RECOGNITION_SERVICE = Symbol.for('MUSIC_RECOGNITION_SERVICE');
export const REMOTE_VIDEO_EXTRACTION_SERVICE = Symbol.for('REMOTE_VIDEO_EXTRACTION_SERVICE');
export const YOUTUBE_VIDEO_EXTRACTION_SERVICE = Symbol.for('YOUTUBE_VIDEO_EXTRACTION_SERVICE');
export const SHAZAM_MUSIC_RECOGNITION_SERVICE = Symbol.for('SHAZAM_MUSIC_RECOGNITION_SERVICE');
export const APP_CONFIG_SERVICE = Symbol.for('APP_CONFIG_SERVICE');
export const TELEGRAM_BOT_SERVICE = Symbol.for('TELEGRAM_BOT_SERVICE');
export const FILE_DOWNLOADER_SERVICE = Symbol.for('FILE_DOWNLOADER_SERVICE');
export const LOGGER_SERVICE = Symbol.for('LOGGER_SERVICE');
export const ANALYTICS_SERVICE = Symbol.for('ANALYTICS_SERVICE');

export const TELEGRAM_BOT_CONTROLLER = Symbol.for('TELEGRAM_BOT_CONTROLLER');

export const METADATA_KEY = {
  telegramBot: Symbol.for('TELEGRAM_BOT_METADATA_KEY'),
  telegramBotMethodList: Symbol.for('TELEGRAM_BOT_METHOD_LIST_METADATA_KEY'),
};

export const UPLOAD_FOLDER = `${__dirname}/uploads`;
export const FRAGMENT_DURATION = '5';

export const messages = {
  EXTRACTING: 'Extracting from remote server...',
  RECOGNITION: 'Recognition...',
  DOWNLOADING: 'Downloading file...',
  UNKNOWN_ERROR: 'An error has occurred',
};

export const goals = {
  categories: {
    SHAZAGRAM: 'SHAZAGRAM',
  },
  actions: {
    START_BOT: 'START_BOT',
    SEND_LINK: 'SEND_LINK',
    SEND_FILE: 'SEND_FILE',
  },
};
