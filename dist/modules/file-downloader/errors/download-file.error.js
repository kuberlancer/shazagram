"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadFileError = void 0;
class DownloadFileError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'DownloadFileError';
        this.message = 'Failed to download file';
    }
}
exports.DownloadFileError = DownloadFileError;
