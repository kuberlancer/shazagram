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
exports.MusicRecognitionService = void 0;
const fs_1 = require("fs");
const util_1 = require("util");
const inversify_1 = require("inversify");
const constants_1 = require("../../constants");
const unlinkAsync = (0, util_1.promisify)(fs_1.unlink);
let MusicRecognitionService = class MusicRecognitionService {
    constructor(shazamMusicRecognitionService) {
        this.shazamMusicRecognitionService = shazamMusicRecognitionService;
    }
    async getDetail(filePath) {
        const detail = await this.shazamMusicRecognitionService.getDetail(filePath);
        await unlinkAsync(filePath);
        return detail;
    }
};
MusicRecognitionService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.SHAZAM_MUSIC_RECOGNITION_SERVICE)),
    __metadata("design:paramtypes", [Object])
], MusicRecognitionService);
exports.MusicRecognitionService = MusicRecognitionService;
