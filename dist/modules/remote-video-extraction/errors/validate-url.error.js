"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateURLError = void 0;
class ValidateURLError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ValidateURLError';
        this.message = 'This is not valid URL';
    }
}
exports.ValidateURLError = ValidateURLError;
