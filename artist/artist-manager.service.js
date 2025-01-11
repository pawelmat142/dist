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
exports.ArtistManagerService = void 0;
const common_1 = require("@nestjs/common");
const artist_model_1 = require("./model/artist.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
const uuid_1 = require("uuid");
let ArtistManagerService = class ArtistManagerService {
    constructor(artistModel) {
        this.artistModel = artistModel;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    fetchArtistsOfManager(profile) {
        return this.artistModel.find({ managerUid: profile.uid });
    }
    async putManagementNotes(body, profile) {
        const update = await this.artistModel.updateOne({ signature: body.artistSignture, managerUid: profile.uid }, { $set: { managmentNotes: body.managmentNotes } });
        if (!update.modifiedCount) {
            throw new common_1.BadRequestException(`Not modified management notes for Artist: ${body.artistSignture} by manager: ${profile.uid}`);
        }
        this.logger.log(`Management notes put success for Artist: ${body.artistSignture} by manager: ${profile.uid}`);
    }
    async setStatus(status, signature, profile) {
        const update = await this.artistModel.updateOne({ signature, managerUid: profile.uid }, { $set: {
                status: status,
                modified: new Date()
            } });
        if (!update.modifiedCount) {
            this.logger.error(`Not modified status artist: ${signature}, by ${profile.uid}`);
            throw new common_1.NotFoundException();
        }
        this.logger.log(`Modified status ${status} artist: ${signature}, by ${profile.uid}`);
    }
    async submitTimelineEvent(artistSignature, event, profile) {
        const authFilter = this.manageFilter(profile);
        const artist = await this.artistModel.findOne({
            $and: [authFilter, { signature: artistSignature }]
        }).exec();
        if (!artist) {
            throw new common_1.NotFoundException(`Not found Artist ${artistSignature} when trying to submit timeline event, ${profile.uid}`);
        }
        const timeline = artist.toObject().timeline || [];
        const index = timeline.findIndex(item => item.id === event.id);
        if (index === -1) {
            event.id = (0, uuid_1.v4)(),
                event.uid = profile.uid;
            timeline.push(event);
        }
        else {
            timeline.splice(index, 1, event);
        }
        const update = await this.artistModel.updateOne({
            signature: artistSignature
        }, { $set: { timeline: timeline } });
        if (!update.modifiedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Not modified ${artistSignature} when trying to submit timeline event, ${profile.uid}`);
        }
        this.logger.log(`Modified Artist ${artistSignature} timeline when trying to submit timeline event, ${profile.uid}`);
        return timeline;
    }
    async removeTimelineEvent(artistSignature, id, profile) {
        const authFilter = this.manageFilter(profile);
        const artist = await this.artistModel.findOne({
            $and: [authFilter, { signature: artistSignature }]
        }).exec();
        if (!artist) {
            throw new common_1.NotFoundException(`Not found Artist ${artistSignature} when trying to remove timeline event, ${profile.uid}`);
        }
        const timeline = artist.toObject().timeline || [];
        const index = timeline.findIndex(item => item.id === id);
        if (index !== -1) {
            timeline.splice(index, 1);
        }
        else {
            throw new illegal_state_exception_1.IllegalStateException(`Not modified ${artistSignature} when trying to remove timeline event, ${profile.uid}`);
        }
        const update = await this.artistModel.updateOne({
            signature: artistSignature
        }, { $set: { timeline: timeline } });
        this.logger.log(`Removed Artist ${artistSignature} timeline event, ${id}`);
        return timeline;
    }
    manageFilter(profile) {
        return profile.artistSignature
            ? { signature: profile.artistSignature }
            : { managerUid: profile.uid };
    }
};
ArtistManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(artist_model_1.Artist.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ArtistManagerService);
exports.ArtistManagerService = ArtistManagerService;
//# sourceMappingURL=artist-manager.service.js.map