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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_telegram_service_1 = require("./profile-telegram.service");
const profile_email_service_1 = require("./profile-email.service");
const profile_service_1 = require("./profile.service");
const jwt_guard_1 = require("./auth/jwt.guard");
const serialize_interceptor_1 = require("../global/interceptors/serialize.interceptor");
const profile_dto_1 = require("./model/profile.dto");
const profile_path_param_getter_1 = require("./auth/profile-path-param-getter");
const profile_model_1 = require("./model/profile.model");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const role_guard_1 = require("./auth/role.guard");
const role_1 = require("./model/role");
let ProfileController = class ProfileController {
    constructor(profileTelegramService, profileEmailService, profileService) {
        this.profileTelegramService = profileTelegramService;
        this.profileEmailService = profileEmailService;
        this.profileService = profileService;
    }
    fetchFullProfile(payload) {
        return this.profileService.fetchFullProfile(payload);
    }
    fetchManagers() {
        return this.profileService.fetchManagers();
    }
    fetchManagerData(profile) {
        return this.profileService.fetchManagerData(profile.uid);
    }
    setManagerData(body, profile) {
        return this.profileService.setManagerData(body, profile);
    }
    fetchTelegramBotHref() {
        return { url: `tg://resolve?domain=${process.env.TELEGRAM_BOT_NAME}` };
    }
    telegramPinRequest(uidOrNameOrEmail) {
        return this.profileTelegramService.telegramPinRequest(uidOrNameOrEmail);
    }
    loginByPin(body) {
        return this.profileTelegramService.loginByPin(body);
    }
    refreshToken(profile) {
        return this.profileService.refreshToken(profile);
    }
    createProfileEmail(body) {
        return this.profileEmailService.createProfile(body);
    }
    loginByEmail(body) {
        return this.profileEmailService.loginByEmail(body);
    }
};
__decorate([
    (0, common_1.Get)('full'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, serialize_interceptor_1.Serialize)(profile_model_1.Profile),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "fetchFullProfile", null);
__decorate([
    (0, common_1.Get)('managers'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, serialize_interceptor_1.Serialize)(profile_dto_1.ProfileDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "fetchManagers", null);
__decorate([
    (0, common_1.Get)('manager-data'),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_1.Role.MANAGER)),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "fetchManagerData", null);
__decorate([
    (0, common_1.Put)('manager-data'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "setManagerData", null);
__decorate([
    (0, common_1.Get)('telegram'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "fetchTelegramBotHref", null);
__decorate([
    (0, common_1.Get)('telegram/pin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "telegramPinRequest", null);
__decorate([
    (0, common_1.Post)('login/pin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "loginByPin", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('email/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "createProfileEmail", null);
__decorate([
    (0, common_1.Post)('email/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "loginByEmail", null);
ProfileController = __decorate([
    (0, common_1.Controller)('api/profile'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    __metadata("design:paramtypes", [profile_telegram_service_1.ProfileTelegramService,
        profile_email_service_1.ProfileEmailService,
        profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map