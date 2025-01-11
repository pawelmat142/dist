"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const profile_controller_1 = require("./profile.controller");
const mongoose_1 = require("@nestjs/mongoose");
const profile_model_1 = require("./model/profile.model");
const config_1 = require("@nestjs/config");
const profile_telegram_service_1 = require("./profile-telegram.service");
const profile_email_service_1 = require("./profile-email.service");
const jwt_guard_1 = require("./auth/jwt.guard");
const app_jwt_service_1 = require("./auth/app-jwt.service");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: profile_model_1.Profile.name,
                    schema: profile_model_1.ProfileSchema
                }]),
            config_1.ConfigModule,
        ],
        providers: [
            profile_service_1.ProfileService,
            profile_telegram_service_1.ProfileTelegramService,
            profile_email_service_1.ProfileEmailService,
            jwt_guard_1.JwtGuard,
            app_jwt_service_1.AppJwtService,
        ],
        controllers: [profile_controller_1.ProfileController],
        exports: [
            profile_telegram_service_1.ProfileTelegramService,
            profile_email_service_1.ProfileEmailService,
            profile_service_1.ProfileService,
            jwt_guard_1.JwtGuard,
            app_jwt_service_1.AppJwtService,
        ]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map