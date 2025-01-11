"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingUtil = void 0;
const role_1 = require("../../profile/model/role");
class BookingUtil {
    static bookingRoles(booking, profileUid) {
        let result = [];
        if (booking.promoterUid === profileUid) {
            result.push(role_1.Role.PROMOTER);
        }
        if (booking.managerUid === profileUid) {
            result.push(role_1.Role.MANAGER);
        }
        if (BookingUtil.artistSignatures(booking).includes(profileUid)) {
            result.push(role_1.Role.ARTIST);
        }
        return result;
    }
    static artistSignatures(booking) {
        return booking.artists.map(a => a.code);
    }
    static addStatusToHistory(booking, profile) {
        var _a;
        const newStatus = {
            status: booking.status,
            uid: profile.uid,
            role: profile.roles.join(','),
            date: new Date(),
            version: ((_a = booking.statusHistory) === null || _a === void 0 ? void 0 : _a.length) || 0
        };
        booking.statusHistory = booking.statusHistory || [];
        booking.statusHistory.push(newStatus);
    }
    static depositDeadline(event) {
        const date = event.startDate;
        date.setMonth(event.startDate.getMonth() - 2);
        return date;
    }
    static feeDeadline(event) {
        const date = event.startDate;
        date.setMonth(event.startDate.getMonth() - 1);
        return date;
    }
    static timelineItem(booking) {
        var _a;
        const result = {
            id: booking.formId,
            status: booking.status,
            eventSignature: booking.eventSignature,
        };
        const eventInformation = booking.formData.eventInformation;
        if (eventInformation) {
            result.startDate = eventInformation.performanceStartDate;
            result.endDate = eventInformation.performanceEndDate;
            result.countryCode = (_a = eventInformation.eventCountry) === null || _a === void 0 ? void 0 : _a.code;
            result.header = eventInformation.eventName;
            result.subheader = eventInformation.venueName;
            result.txt = eventInformation === null || eventInformation === void 0 ? void 0 : eventInformation.website;
        }
        return result;
    }
}
exports.BookingUtil = BookingUtil;
//# sourceMappingURL=booking.util.js.map