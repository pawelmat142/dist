"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingAccessUtil = void 0;
const common_1 = require("@nestjs/common");
class BookingAccessUtil {
    static canCancelBooking(booking, profile) {
        if (['SUBMITTED', 'DOCUMENTS'].includes(booking.status)) {
            if ([booking.promoterUid, booking.managerUid].includes(profile.uid)) {
                return true;
            }
        }
        new common_1.Logger(this.constructor.name).error(`Trying to cancel booking with status ${booking.status} by ${profile.uid}, role: ${profile.roles.join(', ')}`);
        throw new common_1.UnauthorizedException();
    }
    static canRequestBookingDocuments(booking, profile) {
        if (['SUBMITTED'].includes(booking.status)) {
            if ([booking.managerUid].includes(profile.uid)) {
                return true;
            }
        }
        new common_1.Logger(this.constructor.name).error(`Trying to request documents for booking with status ${booking.status} by ${profile.uid}, role: ${profile.roles.join(', ')}`);
        throw new common_1.UnauthorizedException();
    }
}
exports.BookingAccessUtil = BookingAccessUtil;
//# sourceMappingURL=booking-access.util.js.map