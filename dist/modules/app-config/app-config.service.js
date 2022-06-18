"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const inversify_1 = require("inversify");
let AppConfigService = class AppConfigService {
    constructor() {
        this.TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN ?? '';
        this.API_URL = process.env.API_URL ?? 'http://localhost:5000';
        this.SENTRY_DSN = process.env.SENTRY_DSN ?? '';
        this.PORT = process.env.PORT ?? '80';
        this.GOOGLE_ANALYTICS_PROJECT_ID = process.env.GOOGLE_ANALYTICS_PROJECT_ID ?? '';
    }
    isProduction() {
        return process.env.NODE_ENV === 'production';
    }
};
AppConfigService = __decorate([
    (0, inversify_1.injectable)()
], AppConfigService);
exports.AppConfigService = AppConfigService;
