"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadError = void 0;
class FileUploadError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'q';
        this.message = 'This file type is not supported';
    }
}
exports.FileUploadError = FileUploadError;
