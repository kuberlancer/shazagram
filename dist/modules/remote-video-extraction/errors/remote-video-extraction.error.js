"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteVideoExtractionError = void 0;
class RemoteVideoExtractionError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'RemoteVideoExtractionError';
    }
}
exports.RemoteVideoExtractionError = RemoteVideoExtractionError;
