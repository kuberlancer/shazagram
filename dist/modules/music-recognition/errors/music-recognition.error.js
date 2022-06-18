"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicRecognitionError = void 0;
class MusicRecognitionError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'MusicRecognitionError';
        this.message = 'Failed to recognize this music';
    }
}
exports.MusicRecognitionError = MusicRecognitionError;
