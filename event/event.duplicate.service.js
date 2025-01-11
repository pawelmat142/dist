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
exports.EventCreationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_model_1 = require("./model/event.model");
const mongoose_2 = require("mongoose");
const booking_form_processor_1 = require("../booking/util/booking-form-processor");
const util_1 = require("../global/utils/util");
let EventCreationService = class EventCreationService {
    constructor(eventModel) {
        this.eventModel = eventModel;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async findEventDuplicateOrCreateNew(ctx, params) {
        const newEventName = this.processEventName(ctx.booking);
        const promoterEvents = await this.eventModel.find({
            promoterUid: ctx.booking.promoterUid,
        }).exec();
        for (let promoterEvent of promoterEvents) {
            const nameDuplicated = this.isEventNameDuplicated(newEventName, promoterEvent.name);
            if (nameDuplicated) {
                this.logger.log(`Found event with similar name: ${newEventName} related to promoter: ${ctx.booking.promoterUid}`);
                return promoterEvent;
            }
        }
        const event = await this.createNewEvent(newEventName, ctx.booking);
        return event;
    }
    async createNewEvent(newEventName, booking) {
        const dates = this.processEventDates(booking);
        const event = new this.eventModel({
            signature: this.prepareSignature(newEventName),
            promoterUid: booking.promoterUid,
            status: 'CREATED',
            name: newEventName,
            startDate: dates.startDate,
            endDate: dates.endDate,
            formData: booking_form_processor_1.BookingFormProcessor.findEventInformation(booking.formData),
            created: new Date(),
            modified: new Date(),
        });
        await event.save();
        this.logger.log(`Created new event ${newEventName}, related to promoter: ${booking.promoterUid}`);
        return event;
    }
    isEventNameDuplicated(newEventName, promoterEventName, threshold = 5) {
        const distance = this.levenshtein(newEventName, promoterEventName);
        this.logger.warn(`Calculated distance ${distance} between names: ${newEventName} - ${promoterEventName}`);
        if (distance <= threshold) {
            return true;
        }
        return false;
    }
    levenshtein(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
                }
            }
        }
        return matrix[b.length][a.length];
    }
    processEventDates(booking) {
        const dates = booking_form_processor_1.BookingFormProcessor.findEventDates(booking.formData);
        if (!dates) {
            throw new common_1.BadRequestException("Missing event date");
        }
        this.logger.log(`Found event start date: ${util_1.Util.formatDate(dates.startDate)}${dates.endDate ? `, end date: ${util_1.Util.formatDate(dates.endDate)}` : ''}`);
        return dates;
    }
    processEventName(booking) {
        const eventName = booking_form_processor_1.BookingFormProcessor.findEventName(booking.formData);
        if (!eventName) {
            throw new common_1.BadRequestException("Not found event name");
        }
        this.logger.log(`Found event name : ${eventName}`);
        return eventName;
    }
    prepareSignature(eventName) {
        const now = Date.now().toString();
        return `${eventName.replace(/ /g, "_").toLocaleLowerCase()}-${now.slice(-4)}`;
    }
};
EventCreationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_model_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventCreationService);
exports.EventCreationService = EventCreationService;
//# sourceMappingURL=event.duplicate.service.js.map