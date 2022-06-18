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
exports.RemoteVideoExtractionService = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../../constants");
const errors_1 = require("./errors");
let RemoteVideoExtractionService = class RemoteVideoExtractionService {
    constructor(youtubeVideoExtractionService) {
        this.youtubeVideoExtractionService = youtubeVideoExtractionService;
    }
    validateURL(url) {
        const regExp = /(https?:\/\/[^\s]+)/g;
        if (!regExp.test(url)) {
            throw new errors_1.ValidateURLError();
        }
    }
    extract(url) {
        this.validateURL(url);
        if (this.youtubeVideoExtractionService.isAppropriateStrategy(url)) {
            return this.youtubeVideoExtractionService.extract(url);
        }
        throw new errors_1.RemoteVideoExtractionError('This resource is not supported yet');
    }
};
RemoteVideoExtractionService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.YOUTUBE_VIDEO_EXTRACTION_SERVICE)),
    __metadata("design:paramtypes", [Object])
], RemoteVideoExtractionService);
exports.RemoteVideoExtractionService = RemoteVideoExtractionService;
