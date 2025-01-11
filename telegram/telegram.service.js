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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const wizard_service_1 = require("./wizard.service");
const profile_telegram_service_1 = require("../profile/profile-telegram.service");
let TelegramService = class TelegramService {
    constructor(wizardService, profileTelegramService) {
        this.wizardService = wizardService;
        this.profileTelegramService = profileTelegramService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.channelId = process.env.TELEGRAM_CHANNEL_ID;
    }
    onModuleInit() {
        this.profileTelegramService.sendMessageObs$.subscribe(msg => {
            this.logger.log(`Sending message to channel ${msg.telegramChannelId}`);
            this.sendMessage(Number(msg.telegramChannelId), msg.message);
        });
        this.profileTelegramService.cleanMessages$.subscribe(telegramChannelId => {
            this.wizardService.cleanMessages(telegramChannelId);
        });
    }
    async sendMessage(chatId, message) {
        const result = await this.wizardService.sendMessage(chatId, message);
        return result;
    }
};
TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wizard_service_1.WizardService,
        profile_telegram_service_1.ProfileTelegramService])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map