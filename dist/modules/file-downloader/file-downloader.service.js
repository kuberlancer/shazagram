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
exports.FileDownloaderService = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const axios_1 = __importDefault(require("axios"));
const inversify_1 = require("inversify");
const constants_1 = require("../../constants");
const errors_1 = require("./errors");
let FileDownloaderService = class FileDownloaderService {
    async download(url) {
        const response = await (0, axios_1.default)(url, {
            responseType: 'stream',
        });
        return new Promise((resolve, reject) => {
            const stream = (0, fs_1.createWriteStream)((0, path_1.join)(constants_1.UPLOAD_FOLDER, Date.now().toString()));
            const filePath = stream.path;
            response.data.pipe(stream)
                .on('finish', () => {
                resolve(filePath);
            })
                .on('error', (error) => {
                reject(new errors_1.DownloadFileError());
            });
        });
    }
};
FileDownloaderService = __decorate([
    (0, inversify_1.injectable)()
], FileDownloaderService);
exports.FileDownloaderService = FileDownloaderService;
