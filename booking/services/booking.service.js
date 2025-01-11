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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const artist_service_1 = require("../../artist/artist.service");
const event_service_1 = require("../../event/event.service");
const illegal_state_exception_1 = require("../../global/exceptions/illegal-state.exception");
const booking_model_1 = require("../model/booking.model");
const submit_service_1 = require("./submit.service");
const profile_service_1 = require("../../profile/profile.service");
const telegram_service_1 = require("../../telegram/telegram.service");
const bot_util_1 = require("../../telegram/util/bot.util");
let BookingService = class BookingService {
    constructor(bookingModel, submitService, artistService, eventService, profileService, telegramService) {
        this.bookingModel = bookingModel;
        this.submitService = submitService;
        this.artistService = artistService;
        this.eventService = eventService;
        this.profileService = profileService;
        this.telegramService = telegramService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async submitForm(formId, profile, params) {
        const checkFormId = await this.bookingModel.findOne({ formId: formId });
        if (checkFormId) {
            throw new illegal_state_exception_1.IllegalStateException(`Booking for form ${formId} already exists`);
        }
        const ctx = await this.submitService.submitForm(formId, profile, params);
        if (!(params === null || params === void 0 ? void 0 : params.skipValidateDuplicate)) {
            await this.validateBookingDuplicate(ctx.booking);
        }
        this.submitService.msgToManagerAboutSubmitedForm(ctx);
        const saved = await new this.bookingModel(ctx.booking).save();
        return saved;
    }
    async validateBookingDuplicate(booking) {
        const duplicate = await this.bookingModel.findOne({
            "artists.code": { $in: booking.artists.map(a => a.code) },
            eventSignature: booking.eventSignature
        });
        if (duplicate) {
            throw new illegal_state_exception_1.IllegalStateException(`Booking for this event and artist already exists!`);
        }
    }
    async fetchProfileBookings(profile) {
        const filter = this.profileBookingFilter(profile);
        const uid = profile.uid;
        const bookings = await this.bookingModel.find(filter).lean().exec();
        const profileBookings = await Promise.all(bookings.map((b) => this.bookingDtoFromBooking(b)));
        this.logger.log(`Fetch ${profileBookings.length} profile bookings for ${uid}`);
        return profileBookings;
    }
    profileBookingFilter(profile) {
        const uid = profile.uid;
        return { $or: [
                { promoterUid: uid },
                { managerUid: uid },
                { "artists.code": profile.artistSignature }
            ] };
    }
    async panelArtistBookings(artistSignature, profile) {
        const bookings = await this.bookingModel.find({
            "artists.code": artistSignature,
            status: { $nin: ['CANCELED'] },
            managerUid: profile.uid
        }).exec();
        return Promise.all(bookings.map((b) => this.bookingDtoFromBooking(b)));
    }
    async fetchFullBooking(formId, profile) {
        const booking = await this.bookingModel.findOne({
            $and: [
                this.profileBookingFilter(profile),
                { formId: formId }
            ]
        });
        return this.bookingDtoFromBooking(booking);
    }
    async bookingDtoFromBooking(booking) {
        const eventData = await this.eventService.eventDataForBookingsList(booking.eventSignature);
        const result = booking;
        result.event = eventData;
        return result;
    }
    async buildSimpleContext(formId, profile) {
        const booking = await this.fetchBooking(formId, profile);
        return {
            booking,
            profile
        };
    }
    async buildContext(formId, profile) {
        let simpleCtx = await this.buildSimpleContext(formId, profile);
        const event = await this.eventService.fetchEvent(simpleCtx.booking.eventSignature);
        const artists = await this.artistService.getArtists(simpleCtx.booking.artists.map(a => a.code));
        return Object.assign(Object.assign({}, simpleCtx), { event,
            artists });
    }
    async fetchFormData(formId, profile) {
        const booking = await this.fetchBooking(formId, profile);
        return booking.formData;
    }
    async fetchBooking(formId, profile) {
        const booking = await this.bookingModel.findOne({ formId });
        if (!booking) {
            throw new common_1.NotFoundException();
        }
        if (profile.artistSignature) {
            const artistSignatures = booking.artists.map(a => a.code);
            if (!artistSignatures.includes(profile.artistSignature)) {
                throw new common_1.UnauthorizedException();
            }
        }
        else {
            const uidsWithAccess = [
                booking.promoterUid,
                booking.managerUid,
            ];
            if (!uidsWithAccess.includes(profile.uid)) {
                throw new common_1.UnauthorizedException();
            }
        }
        return booking;
    }
    async update(booking) {
        const update = await this.bookingModel.updateOne({ formId: booking.formId }, { $set: booking });
        this.logger.warn(`Updated booking ${booking.formId} with status ${booking.status}`);
        if (!(update === null || update === void 0 ? void 0 : update.modifiedCount)) {
            throw new illegal_state_exception_1.IllegalStateException(`Not updated booking ${booking.formId}`);
        }
    }
    async findPromoterInfo(uid) {
        var _a;
        const booking = await this.bookingModel.findOne({ promoterUid: uid })
            .sort({ created: -1 })
            .select({ formData: true })
            .exec();
        const promoterInformation = (_a = booking === null || booking === void 0 ? void 0 : booking.formData) === null || _a === void 0 ? void 0 : _a.promoterInformation;
        if (promoterInformation) {
            this.logger.log(`Found promoter info for profile: ${uid}`);
            return promoterInformation;
        }
        this.logger.log(`Not found promoter info for profile: ${uid}`);
        return null;
    }
    async msgToPromoterOrManager(ctx, msg) {
        const uidsToSend = [
            ctx.booking.managerUid,
            ctx.booking.promoterUid,
        ].filter(uid => uid !== ctx.profile.uid);
        for (let uid of uidsToSend) {
            const profile = await this.profileService.findTelegramChannedId(uid);
            const telegramChannelId = profile === null || profile === void 0 ? void 0 : profile.telegramChannelId;
            if (telegramChannelId) {
                const chatId = Number(telegramChannelId);
                if (!isNaN(chatId)) {
                    const result = await this.telegramService.sendMessage(chatId, bot_util_1.BotUtil.msgFrom(msg));
                }
            }
        }
    }
    async hasPermissionToBooking(formId, uid) {
        const result = await this.bookingModel.exists({ formId: formId, $or: [
                { promoterUid: uid },
                { managerUid: uid },
                { "artists.code": uid }
            ] }).exec();
        if (result) {
            this.logger.log(`User ${uid} has permission to Booking ${formId}`);
            return true;
        }
        else {
            throw new common_1.UnauthorizedException(`User ${uid} has no permission to Booking ${formId}`);
        }
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_model_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        submit_service_1.SubmitService,
        artist_service_1.ArtistService,
        event_service_1.EventService,
        profile_service_1.ProfileService,
        telegram_service_1.TelegramService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map