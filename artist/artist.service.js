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
exports.ArtistService = void 0;
const common_1 = require("@nestjs/common");
const artist_model_1 = require("./model/artist.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
const artist_util_1 = require("./artist.util");
const profile_service_1 = require("../profile/profile.service");
const telegram_service_1 = require("../telegram/telegram.service");
const bot_util_1 = require("../telegram/util/bot.util");
const form_util_1 = require("../form/form.util");
const message_exception_1 = require("../global/exceptions/message-exception");
let ArtistService = class ArtistService {
    constructor(artistModel, profileService, telegramService) {
        this.artistModel = artistModel;
        this.profileService = profileService;
        this.telegramService = telegramService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.PUBLIC_VIEW_ARTIST_STATUSES = ['ACTIVE'];
    }
    async createArtist(form, profile) {
        const checkName = await this.artistModel.findOne({ name: form.artistName });
        if (checkName) {
            throw new message_exception_1.MessageException(`Artist name taken`);
        }
        const newArtist = new this.artistModel({
            signature: this.prepareArtistSignature(form.artistName),
            name: form.artistName,
            status: 'CREATED',
            images: { bg: [], avatar: {} },
            created: new Date(),
            managerUid: form.manager.code,
        });
        await this.profileService.updateArtistProfile(form, profile, newArtist.signature);
        const saved = await newArtist.save();
        this.logger.warn(`Artist created, name: ${newArtist.name}, signature: ${newArtist.signature}`);
        return saved;
    }
    fetchArtist(query) {
        if (query.name) {
            return this.artistModel.findOne({ name: query.name });
        }
        if (query.signature) {
            return this.artistModel.findOne({ signature: query.signature });
        }
        throw new common_1.BadRequestException(`Name or signature required`);
    }
    getArtist(signature) {
        return this.artistModel.findOne({ signature }).exec();
    }
    getArtists(signatures) {
        return this.artistModel.find({ signature: { $in: signatures } });
    }
    fetchArtists() {
        return this.artistModel.find({ status: { $in: this.PUBLIC_VIEW_ARTIST_STATUSES } });
    }
    listNamesBySignatures(signatures) {
        return this.artistModel.distinct('name', { signature: { $in: signatures } });
    }
    async updateArtistView(artist, profile) {
        const checkName = await this.artistModel.findOne({ $and: [
                { name: artist.name },
                { signature: { $ne: artist.signature } }
            ] }).select({ signature: true });
        if (checkName) {
            throw new message_exception_1.MessageException('Artist name already in use');
        }
        const artistBefore = await this.artistModel.findOne({ signature: artist.signature });
        if (!artistBefore) {
            throw new common_1.NotFoundException();
        }
        if (artistBefore.signature !== profile.artistSignature) {
            throw new common_1.UnauthorizedException();
        }
        const newArtist = Object.assign(artistBefore, artist);
        if (newArtist.status === 'CREATED' && artist_util_1.ArtistUtil.isViewReady(newArtist)) {
            this.msgToManager(newArtist);
            newArtist.status = 'READY';
        }
        newArtist.modified = new Date();
        const update = await this.artistModel.updateOne({ signature: newArtist.signature }, { $set: newArtist });
        if (!(update === null || update === void 0 ? void 0 : update.modifiedCount)) {
            this.logger.warn(`Not modified!`);
        }
        return newArtist;
    }
    async msgToManager(artist) {
        const profile = await this.profileService.findTelegramChannedId(artist.managerUid);
        if (profile === null || profile === void 0 ? void 0 : profile.telegramChannelId) {
            this.telegramService.sendMessage(Number(profile.telegramChannelId), bot_util_1.BotUtil.msgFrom([
                `View of artist ${artist.name} is ready to be published`,
            ]));
        }
    }
    prepareArtistSignature(name) {
        const nameWithoutSpaces = name.replace(/\s+/g, '').toLowerCase();
        const initials = nameWithoutSpaces.split('').map((char, index) => {
            if (index === 0 || nameWithoutSpaces[index - 1] === nameWithoutSpaces[index - 1].toLowerCase()) {
                return char;
            }
            return '';
        }).join('');
        const timestamp = Date.now().toString(36);
        const uniqueSignature = `${initials}${timestamp}`;
        return uniqueSignature;
    }
    async processBookingForm(ctx) {
        const artist = form_util_1.FormUtil.get(ctx.booking.formData, 'artistInformation.artist');
        const artistSignatures = [artist.code];
        if (!(artistSignatures === null || artistSignatures === void 0 ? void 0 : artistSignatures.length)) {
            throw new illegal_state_exception_1.IllegalStateException("Missing artist signatures");
        }
        this.logger.log(`Found artist signatures: ${artistSignatures.join(', ')}`);
        const artists = await this.artistModel.find({ signature: { $in: artistSignatures } }, {
            signature: true, managerUid: true, name: true
        });
        if (artists.length !== artistSignatures.length) {
            throw new illegal_state_exception_1.IllegalStateException(`Not found artists for booking ${ctx.booking.formId}`);
        }
        ctx.booking.artists = [artist];
        ctx.booking.managerUid = artists[0].managerUid;
    }
    async listMusicStyles() {
        return this.artistModel.distinct('styles');
    }
    listArtistLabels() {
        return this.artistModel.distinct('labels');
    }
    getTimeline(artistSignature) {
        return this.artistModel.findOne({ signature: artistSignature }, { timeline: true });
    }
};
ArtistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(artist_model_1.Artist.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        profile_service_1.ProfileService,
        telegram_service_1.TelegramService])
], ArtistService);
exports.ArtistService = ArtistService;
//# sourceMappingURL=artist.service.js.map