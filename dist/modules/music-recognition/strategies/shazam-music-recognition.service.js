"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShazamMusicRecognitionService = void 0;
const inversify_1 = require("inversify");
const child_process_1 = require("child_process");
const errors_1 = require("../errors");
let ShazamMusicRecognitionService = class ShazamMusicRecognitionService {
    async getDetail(filePath) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(`songrec audio-file-to-recognized-song ${filePath}`, (error, stdout, stderr) => {
                if (error) {
                    console.log('Error:', error);
                    reject(new errors_1.MusicRecognitionError());
                }
                if (stderr) {
                    console.log('Stderr:', stderr);
                    reject(new errors_1.MusicRecognitionError());
                }
                try {
                    const matchResult = JSON.parse(stdout);
                    const { subtitle, title, url } = matchResult.track;
                    resolve({ subtitle, title, url });
                }
                catch (e) {
                    reject(new errors_1.MusicRecognitionError());
                }
            });
        });
    }
};
ShazamMusicRecognitionService = __decorate([
    (0, inversify_1.injectable)()
], ShazamMusicRecognitionService);
exports.ShazamMusicRecognitionService = ShazamMusicRecognitionService;
