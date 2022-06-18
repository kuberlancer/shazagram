"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeVideoExtractionService = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const inversify_1 = require("inversify");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const constants_1 = require("../../../constants");
const errors_1 = require("../errors");
let YoutubeVideoExtractionService = class YoutubeVideoExtractionService {
    isAppropriateStrategy(url) {
        return /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g
            .test(url);
    }
    async extract(url) {
        const info = await ytdl_core_1.default.getInfo(url);
        const format = ytdl_core_1.default.chooseFormat(info.formats, { quality: '18' });
        const dest = path_1.default.join(constants_1.UPLOAD_FOLDER, `${Date.now().toString()}.${format.container}`);
        const startTime = url.split('?t=')[1] || '0';
        return new Promise((resolve, reject) => {
            const process = (0, child_process_1.spawn)('ffmpeg', [
                '-i', format.url,
                '-ss', startTime,
                '-t', constants_1.FRAGMENT_DURATION,
                '-c', 'copy',
                dest,
            ]);
            process.stdout.on('data', (data) => {
                console.log(data);
            });
            process.stderr.setEncoding('utf8');
            process.stderr.on('data', (data) => {
                console.log(data);
            });
            process.on('close', () => {
                resolve(dest);
            });
            process.on('error', (error) => {
                reject(new errors_1.RemoteVideoExtractionError('Failed to extract file from YouTube'));
            });
        });
    }
};
YoutubeVideoExtractionService = __decorate([
    (0, inversify_1.injectable)()
], YoutubeVideoExtractionService);
exports.YoutubeVideoExtractionService = YoutubeVideoExtractionService;
