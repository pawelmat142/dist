"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookForm = void 0;
const date_util_1 = require("../../global/utils/date.util");
const getBookForm = (artist, promoterInformation, eventInformation) => {
    const date = (eventInformation === null || eventInformation === void 0 ? void 0 : eventInformation.performanceStartDate) ? new Date(eventInformation.performanceStartDate) : new Date();
    return {
        eventInformation,
        promoterInformation,
        artistInformation: {
            artist: artist,
            offer: "5000",
            travel: "We will book fly to nearby airport",
            accommodation: "Nearby hotel will be organised",
            groundTransport: "We have drivers",
            visa: "not needed",
            detailsOfMediaRecordingRequests: ""
        },
        performanceDetails: {
            stageRoom: "main",
            proposedSetTime: "21:00",
            runningOrder: "3 or 4",
            doors: "main",
            curfew: "-",
            exclusivityRadiusIssues: "-",
            offerExpiryDate: date_util_1.DateUtil.addMonths(date, -3)
        },
    };
};
exports.getBookForm = getBookForm;
//# sourceMappingURL=book-forms.js.map