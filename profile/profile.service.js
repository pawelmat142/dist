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
const profile_model_1 = require("./model/profile.model");
const mongoose_2 = require("mongoose");
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
const app_jwt_service_1 = require("./auth/app-jwt.service");
let ProfileService = class ProfileService {
    constructor(profileModel, jwtService) {
        this.profileModel = profileModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    findById(uid) {
        return this.profileModel.findOne({ uid });
    }
    findByArtistSignature(artistSignature) {
        return this.profileModel.findOne({ artistSignature });
    }
    findTelegramChannedId(uid) {
        return this.profileModel.findOne({ uid }).select('telegramChannelId');
    }
    fetchForJwt(uid) {
        return this.profileModel.findOne({ uid })
            .select({
            uid: true,
            name: true,
            roles: true,
            artistSignature: true,
            telegramChannelId: true,
        });
    }
    async updatePromoterInfoWhenSubmitForm(formData, profile) {
        const promoterInfo = formData.promoterInformation;
        if (!promoterInfo) {
            throw new illegal_state_exception_1.IllegalStateException('Not found promoter info');
        }
        await this.profileModel.updateOne({ uid: profile.uid }, { $set: {
                promoterInfo: promoterInfo,
                modified: new Date()
            } });
    }
    async createProfile(_profile, registerMode) {
        const checkName = await this.profileModel.findOne({ name: _profile.name })
            .select({ _id: true });
        if (checkName) {
            throw new common_1.BadRequestException('Name already n use');
        }
        const profile = new this.profileModel({
            uid: _profile.uid,
            name: _profile.name,
            roles: _profile.roles,
            registerMode: registerMode,
            telegramChannelId: _profile.telegramChannelId,
            email: _profile.email,
            passwordHash: _profile.passwordHash,
            created: new Date()
        });
        const saved = await profile.save();
        this.logger.log(`Created user ${profile.name}, uid: ${profile.uid}`);
        return saved;
    }
    fetchManagers() {
        return this.profileModel.find({ roles: 'MANAGER' });
    }
    async fetchManagerData(uid) {
        const managerProfile = await this.profileModel.findOne({ uid }).select('managerData');
        if (managerProfile) {
            return managerProfile.managerData;
        }
    }
    setManagerData(managerData, profile) {
        return this.profileModel.updateOne({ uid: profile.uid }, { $set: { managerData } });
    }
    fetchFullProfile(payload) {
        return this.profileModel.findOne({ uid: payload.uid });
    }
    async refreshToken(_profile) {
        const profile = await this.profileModel.findOne({ uid: _profile.uid });
        const token = this.jwtService.signIn(profile);
        return { token: token };
    }
    async updateArtistProfile(form, _profile, artistSignature) {
        const update = await this.profileModel.updateOne({ uid: _profile.uid }, { $set: {
                firstName: form.firstName,
                lastName: form.lastName,
                contactEmail: form.email,
                phoneNumber: form.phoneNumber,
                artistSignature: artistSignature,
                modified: new Date()
            } });
        if (!update.modifiedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Artist profile not modified, uid: ${_profile.uid},`);
        }
        this.logger.log(`Updated profile via created Artist entity`);
        return update;
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_model_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        app_jwt_service_1.AppJwtService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map