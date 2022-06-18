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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const inversify_1 = require("inversify");
const universal_analytics_1 = __importDefault(require("universal-analytics"));
const constants_1 = require("../../constants");
let AnalyticsService = class AnalyticsService {
    constructor(appConfig, loggerService) {
        this.appConfig = appConfig;
        this.loggerService = loggerService;
    }
    event(userId, category, action, label) {
        const { GOOGLE_ANALYTICS_PROJECT_ID: projectId } = this.appConfig;
        const visitor = (0, universal_analytics_1.default)(projectId, userId.toString(), {
            strictCidFormat: false,
        });
        if (this.appConfig.isProduction()) {
            visitor.event({
                ec: category,
                ea: action,
                el: label,
            }, (error) => {
                if (error) {
                    this.loggerService.log(error);
                }
            }).send();
        }
        else {
            console.table({
                category,
                action,
                label,
            });
        }
    }
};
AnalyticsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(constants_1.APP_CONFIG_SERVICE)),
    __param(1, (0, inversify_1.inject)(constants_1.LOGGER_SERVICE)),
    __metadata("design:paramtypes", [Object, Object])
], AnalyticsService);
exports.AnalyticsService = AnalyticsService;
