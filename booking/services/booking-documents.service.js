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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDocumentsService = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_access_util_1 = require("../util/booking-access.util");
const bot_util_1 = require("../../telegram/util/bot.util");
const booking_util_1 = require("../util/booking.util");
const artist_util_1 = require("../../artist/artist.util");
let BookingDocumentsService = class BookingDocumentsService {
    constructor(bookingService) {
        this.bookingService = bookingService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async requestDocuments(formId, profile) {
        const ctx = await this.bookingService.buildContext(formId, profile);
        booking_access_util_1.BookingAccessUtil.canRequestBookingDocuments(ctx.booking, profile);
        ctx.booking.status = 'DOCUMENTS';
        booking_util_1.BookingUtil.addStatusToHistory(ctx.booking, profile);
        await this.bookingService.update(ctx.booking);
        this.bookingService.msgToPromoterOrManager(ctx, [
            `Requested documents step for booking at ${bot_util_1.BotUtil.formatDate(ctx.event.startDate)}`,
            `Event name: ${ctx.event.name}`,
            `Artist: ${artist_util_1.ArtistUtil.artistNames(ctx.artists)}`,
        ]);
        this.logger.log(`Requested documents step for booking ${ctx.booking.formId}, by ${ctx.profile.uid}`);
        return ctx.booking;
    }
};
BookingDocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingDocumentsService);
exports.BookingDocumentsService = BookingDocumentsService;
//# sourceMappingURL=booking-documents.service.js.map