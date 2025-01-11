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
exports.ProfileTelegramService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const profile_model_1 = require("./model/profile.model");
const mongoose_2 = require("mongoose");
const telegram_util_1 = require("../telegram/util/telegram.util");
const app_jwt_service_1 = require("./auth/app-jwt.service");
const profile_service_1 = require("./profile.service");
const rxjs_1 = require("rxjs");
const bot_util_1 = require("../telegram/util/bot.util");
const message_exception_1 = require("../global/exceptions/message-exception");
let ProfileTelegramService = class ProfileTelegramService {
    constructor(profileModel, jwtService, profileService) {
        this.profileModel = profileModel;
        this.jwtService = jwtService;
        this.profileService = profileService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.sendMessageSubject$ = new rxjs_1.Subject();
        this.cleanMessagesSubject$ = new rxjs_1.Subject();
        this.loginTokens = [];
    }
    get sendMessageObs$() {
        return this.sendMessageSubject$.asObservable();
    }
    get cleanMessages$() {
        return this.cleanMessagesSubject$.asObservable();
    }
    sendMessage(msg) {
        this.sendMessageSubject$.next(msg);
    }
    findByTelegram(telegramChannelId) {
        return this.profileModel.findOne({ telegramChannelId });
    }
    findByName(name) {
        return this.profileModel.findOne({ name });
    }
    async telegramPinRequest(uidOrNameOrEmail) {
        this.logger.log(`Telegram PIN request with argument uidOrNameOrEmail: ${uidOrNameOrEmail}`);
        let profile = await this.profileModel.findOne({ uid: uidOrNameOrEmail }, { telegramChannelId: true });
        if (!profile) {
            profile = await this.profileModel.findOne({ name: uidOrNameOrEmail }, { telegramChannelId: true });
            if (!profile) {
                profile = await this.profileModel.findOne({ email: uidOrNameOrEmail }, { telegramChannelId: true });
                if (!profile) {
                    throw new common_1.NotFoundException(`Not found matched profile`);
                }
            }
        }
        if (!profile.telegramChannelId) {
            return null;
        }
        const token = await this.generateLoginToken(profile.telegramChannelId);
        this.sendMessage({
            telegramChannelId: profile.telegramChannelId,
            message: bot_util_1.BotUtil.msgFrom([
                `You login PIN: ${token.pin}`,
                `It's valid for 60 seconds`
            ])
        });
        return { token: token.token };
    }
    async loginByPin(input) {
        const token = this.loginTokens.find(t => t.token === input.token);
        if (!token || new Date() > token.expiration) {
            throw new message_exception_1.MessageException(`PIN is expired, try again`);
        }
        if (token.pin !== input.pin) {
            throw new message_exception_1.MessageException(`Wrong PIN, try again`);
        }
        const profile = await this.findByTelegram(token.telegramChannelId);
        if (!profile) {
            throw new message_exception_1.MessageException(`Profile not found`);
        }
        this.cleanMessagesSubject$.next(token.telegramChannelId);
        return { token: this.jwtService.signIn(profile) };
    }
    async generateLoginToken(telegramChannelId) {
        const check = await this.profileModel.findOne({ telegramChannelId });
        if (!check)
            throw new message_exception_1.MessageException('Not a telegram member');
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 1);
        const loginToken = {
            telegramChannelId: telegramChannelId,
            token: telegram_util_1.TelegramUtil.loginToken(),
            pin: telegram_util_1.TelegramUtil.pin(),
            expiration
        };
        this.loginTokens = this.loginTokens.filter(t => t.telegramChannelId !== telegramChannelId);
        this.loginTokens.push(loginToken);
        return loginToken;
    }
    async createProfile(profile) {
        if (!profile.telegramChannelId) {
            throw new common_1.BadRequestException('Missing telegram channel id');
        }
        const checkTelegram = await this.profileModel.findOne({
            telegramChannelId: profile.telegramChannelId
        });
        if (checkTelegram) {
            throw new message_exception_1.MessageException('Name in use');
        }
        profile.uid = telegram_util_1.TelegramUtil.idByTelegram(profile.telegramChannelId);
        await this.profileService.createProfile(profile, 'TELEGRAM');
    }
    async deleteByTelegram(profile) {
        const deleted = await this.profileModel.deleteOne({
            uid: profile.uid
        });
        if (!deleted.deletedCount) {
            throw new common_1.NotFoundException(`Not found user with uid: ${profile.uid}`);
        }
        this.cleanMessagesSubject$.next(profile.telegramChannelId);
    }
};
ProfileTelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_model_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        app_jwt_service_1.AppJwtService,
        profile_service_1.ProfileService])
], ProfileTelegramService);
exports.ProfileTelegramService = ProfileTelegramService;
//# sourceMappingURL=profile-telegram.service.js.map