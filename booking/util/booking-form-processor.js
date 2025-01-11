"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingFormProcessor = void 0;
const illegal_state_exception_1 = require("../../global/exceptions/illegal-state.exception");
class BookingFormProcessor {
    static findEventInformation(bookingFormData) {
        const eventInformation = bookingFormData['eventInformation'];
        if (!eventInformation) {
            throw new illegal_state_exception_1.IllegalStateException("Missing eventInformation");
        }
        return eventInformation;
    }
    static findEventDates(bookingFormData) {
        const eventInformation = this.findEventInformation(bookingFormData);
        const start = eventInformation['performanceStartDate'];
        const end = eventInformation['performanceEndDate'];
        if (!start) {
            throw new illegal_state_exception_1.IllegalStateException("Missing event date");
        }
        const startDate = new Date(start);
        if (startDate instanceof Date) {
            const result = { startDate };
            if (end) {
                const endDate = new Date(end);
                if (endDate instanceof Date) {
                    result.endDate = endDate;
                }
            }
            return result;
        }
    }
    static findEventName(bookingFormData) {
        const eventInformation = this.findEventInformation(bookingFormData);
        if (eventInformation) {
            const eventName = eventInformation['eventName'];
            if (!eventName) {
                throw new illegal_state_exception_1.IllegalStateException(`Not found event name`);
            }
            return eventName;
        }
    }
    static findArtistInformation(bookingFormData) {
        const artistInformation = bookingFormData['artistInformation'];
        if (!artistInformation) {
            throw new illegal_state_exception_1.IllegalStateException("Missing artistInformation");
        }
        return artistInformation;
    }
}
exports.BookingFormProcessor = BookingFormProcessor;
//# sourceMappingURL=booking-form-processor.js.map