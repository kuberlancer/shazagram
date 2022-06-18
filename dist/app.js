#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importStar(require("express"));
const telegraf_1 = require("telegraf");
const container_1 = require("./container");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const config = container_1.container.get(constants_1.APP_CONFIG_SERVICE);
const bot = new telegraf_1.Telegraf(config.TELEGRAM_API_TOKEN);
const secretPath = `/telegraf/${bot.secretPathComponent()}`;
bot.telegram.setWebhook(config.API_URL + secretPath);
const botController = container_1.container.get(constants_1.TELEGRAM_BOT_CONTROLLER);
(0, utils_1.registerBotController)(bot, botController);
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, multer_1.default)({
    dest: constants_1.UPLOAD_FOLDER,
    limits: {
        fileSize: 4e+7,
    },
}).single('music'));
app.use(bot.webhookCallback(secretPath));
app.listen(config.PORT, () => {
    console.log('App is running');
});
