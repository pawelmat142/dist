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
exports.BookingCancelService = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_access_util_1 = require("../util/booking-access.util");
const booking_util_1 = require("../util/booking.util");
const bot_util_1 = require("../../telegram/util/bot.util");
const artist_util_1 = require("../../artist/artist.util");
let BookingCancelService = class BookingCancelService {
    constructor(bookingService) {
        this.bookingService = bookingService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async cancelBooking(formId, profile) {
        const ctx = await this.bookingService.buildContext(formId, profile);
        booking_access_util_1.BookingAccessUtil.canCancelBooking(ctx.booking, profile);
        ctx.booking.status = 'CANCELED';
        booking_util_1.BookingUtil.addStatusToHistory(ctx.booking, ctx.profile);
        await this.bookingService.update(ctx.booking);
        this.bookingService.msgToPromoterOrManager(ctx, [
            `Cancelled booking at ${bot_util_1.BotUtil.formatDate(ctx.event.startDate)}`,
            `Event name: ${ctx.event.name}`,
            `Artist: ${artist_util_1.ArtistUtil.artistNames(ctx.artists)}`
        ]);
        this.logger.log(`Cancelled booking ${ctx.booking.formId}, by ${ctx.profile.uid}`);
        return ctx.booking;
    }
};
BookingCancelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingCancelService);
exports.BookingCancelService = BookingCancelService;
//# sourceMappingURL=booking-cancel.service.js.map