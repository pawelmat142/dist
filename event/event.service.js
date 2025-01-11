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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_model_1 = require("./model/event.model");
const event_duplicate_service_1 = require("./event.duplicate.service");
let EventService = class EventService {
    constructor(eventModel, eventCreationService) {
        this.eventModel = eventModel;
        this.eventCreationService = eventCreationService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    fetchPromoterEvents(profile) {
        return this.eventModel.find({ promoterUid: profile.uid });
    }
    fetchEvent(signature) {
        return this.eventModel.findOne({ signature }).lean().exec();
    }
    async eventDataForBookingsList(signature) {
        const event = await this.eventModel.findOne({ signature }).select(['name', 'startDate', 'endDate']);
        if (!event) {
            throw new common_1.NotFoundException(`Not found event by signature: ${signature}`);
        }
        return event;
    }
    async processBookingForm(ctx, params) {
        const event = await this.eventCreationService.findEventDuplicateOrCreateNew(ctx, params);
        ctx.event = event;
        ctx.booking.eventSignature = event.signature;
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_model_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        event_duplicate_service_1.EventCreationService])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map