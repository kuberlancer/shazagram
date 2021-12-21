import 'reflect-metadata';
import dotenv from 'dotenv';
import multer from 'multer';
import express, { json, urlencoded } from 'express';
import { Telegraf } from 'telegraf';
import { container } from './container';
import { IAppConfigService } from './modules/app-config';
import {
  APP_CONFIG_SERVICE,
  TELEGRAM_BOT_CONTROLLER,
  UPLOAD_FOLDER,
} from './constants';
import { registerBotController } from './utils';

dotenv.config();

const app = express();

const config = container.get<IAppConfigService>(APP_CONFIG_SERVICE);
const bot = new Telegraf(config.TELEGRAM_API_TOKEN);

const secretPath = `/telegraf/${bot.secretPathComponent()}`;
bot.telegram.setWebhook(config.API_URL + secretPath);

const botController = container.get(TELEGRAM_BOT_CONTROLLER);
registerBotController(bot, botController);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(multer({
  dest: UPLOAD_FOLDER,
  limits: {
    fileSize: 4e+7,
  },
}).single('music'));
app.use(bot.webhookCallback(secretPath));

app.listen(5000, () => {
  console.log('App is running');
});
