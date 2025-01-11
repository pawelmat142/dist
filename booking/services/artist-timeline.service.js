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
exports.ArtistTimelineService = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("../../artist/artist.service");
const booking_model_1 = require("../model/booking.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_util_1 = require("../util/booking.util");
let ArtistTimelineService = class ArtistTimelineService {
    constructor(bookingModel, artistService) {
        this.bookingModel = bookingModel;
        this.artistService = artistService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async getTimeline(artistSignature) {
        const bookings = await this.getArtistBookings(artistSignature);
        const timelineItems = bookings.map(_booking => {
            return booking_util_1.BookingUtil.timelineItem(_booking.toObject());
        });
        const timelineResult = await this.artistService.getTimeline(artistSignature);
        const timeline = timelineResult.timeline;
        if (timeline) {
            timelineItems.push(...timeline);
        }
        return timelineItems;
    }
    async getArtistBookings(artistSignature) {
        return this.bookingModel.find({
            "artists.code": artistSignature,
            status: { $nin: ['CANCELED'] },
        }, {
            status: true,
            formId: true,
            "formData.eventInformation": true,
            eventSignature: true,
        }).exec();
    }
};
ArtistTimelineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_model_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        artist_service_1.ArtistService])
], ArtistTimelineService);
exports.ArtistTimelineService = ArtistTimelineService;
//# sourceMappingURL=artist-timeline.service.js.map