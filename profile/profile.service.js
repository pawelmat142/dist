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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const profile_model_1 = require("./profile.model");
let ProfileService = class ProfileService {
    constructor(profileModel) {
        this.profileModel = profileModel;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    findById(uid) {
        return this.profileModel.findOne({ uid }).exec();
    }
    findByName(name) {
        return this.profileModel.findOne({ name }).exec();
    }
    findByTelegram(telegramChannelId) {
        return this.profileModel.findOne({ telegramChannelId });
    }
    async createProfile(_profile) {
        const checkName = await this.profileModel.findOne({ name: _profile.name })
            .select({ _id: true });
        if (checkName) {
            throw new common_1.BadRequestException('Name already n use');
        }
        const profile = new this.profileModel({
            name: _profile.name,
            roles: [],
            status: 'ACTIVE',
            telegramChannelId: _profile.telegramChannelId,
            created: new Date()
        });
        const saved = await profile.save();
        this.logger.log(`Created user ${profile.name}, uid: ${profile.telegramChannelId}`);
        return saved;
    }
    async deleteProfile(profile) {
        const result = await this.profileModel.deleteOne({ telegramChannelId: profile.telegramChannelId });
        if (!result.deletedCount) {
            throw new common_1.NotFoundException(`Profile not found`);
        }
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_model_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map