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
exports.ProfileEmailService = void 0;
const common_1 = require("@nestjs/common");
const app_jwt_service_1 = require("./auth/app-jwt.service");
const mongoose_1 = require("@nestjs/mongoose");
const profile_model_1 = require("./model/profile.model");
const mongoose_2 = require("mongoose");
const crypto_1 = require("crypto");
const crypto_2 = require("crypto");
const util_1 = require("util");
const profile_service_1 = require("./profile.service");
const util_2 = require("../global/utils/util");
const message_exception_1 = require("../global/exceptions/message-exception");
const scrypt = (0, util_1.promisify)(crypto_2.scrypt);
let ProfileEmailService = class ProfileEmailService {
    constructor(profileModel, jwtService, profileService) {
        this.profileModel = profileModel;
        this.jwtService = jwtService;
        this.profileService = profileService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.HASH_CONSTANT = 32;
    }
    async createProfile(form) {
        if (!form.name) {
            throw new message_exception_1.MessageException('Missing name');
        }
        if (!form.email) {
            throw new message_exception_1.MessageException('Missing email');
        }
        const checkEmail = await this.profileModel.findOne({
            email: form.email
        }).select('_id');
        if (checkEmail) {
            throw new message_exception_1.MessageException('Email already in use');
        }
        if (!form.password) {
            throw new message_exception_1.MessageException('Missing password');
        }
        if (!form.role) {
            throw new message_exception_1.MessageException('Missing role');
        }
        const profile = new this.profileModel(form);
        profile.roles = [form.role.code];
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = await scrypt(form.password, salt, this.HASH_CONSTANT);
        const hashPassword = salt + '.' + hash.toString('hex');
        profile.passwordHash = hashPassword;
        profile.uid = this.emailUid(profile.name);
        return this.profileService.createProfile(profile, 'EMAIL');
    }
    async loginByEmail(form) {
        if (!form.email) {
            throw new message_exception_1.MessageException('Missing email');
        }
        const profile = await this.profileModel.findOne({ email: form.email });
        if (!profile) {
            throw new message_exception_1.MessageException("Wrong credentials");
        }
        const [salt, storedHash] = profile.passwordHash.split('.');
        const hash = (await scrypt(form.password, salt, 32));
        if (storedHash !== hash.toString('hex'))
            throw new message_exception_1.MessageException("Wrong credentials");
        const token = this.jwtService.signIn(profile);
        this.logger.log(`Logged in profile ${profile.name}`);
        return { token: token };
    }
    emailUid(name) {
        return `email_${util_2.Util.toKebabCase(name)}`;
    }
};
ProfileEmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_model_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        app_jwt_service_1.AppJwtService,
        profile_service_1.ProfileService])
], ProfileEmailService);
exports.ProfileEmailService = ProfileEmailService;
//# sourceMappingURL=profile-email.service.js.map