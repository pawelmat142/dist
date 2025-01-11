"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const booking_controller_1 = require("./booking.controller");
const mongoose_1 = require("@nestjs/mongoose");
const booking_model_1 = require("./model/booking.model");
const config_1 = require("@nestjs/config");
const form_module_1 = require("../form/form.module");
const profile_module_1 = require("../profile/profile.module");
const artist_module_1 = require("../artist/artist.module");
const event_module_1 = require("../event/event.module");
const telegram_module_1 = require("../telegram/telegram.module");
const booking_service_1 = require("./services/booking.service");
const submit_service_1 = require("./services/submit.service");
const booking_cancel_service_1 = require("./services/booking-cancel.service");
const booking_documents_service_1 = require("./services/booking-documents.service");
const artist_timeline_service_1 = require("./services/artist-timeline.service");
let BookingModule = class BookingModule {
};
BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: booking_model_1.Booking.name,
                    schema: booking_model_1.BookingSchema
                }]),
            config_1.ConfigModule,
            form_module_1.FormModule,
            profile_module_1.ProfileModule,
            artist_module_1.ArtistModule,
            event_module_1.EventModule,
            telegram_module_1.TelegramModule,
        ],
        providers: [
            booking_service_1.BookingService,
            submit_service_1.SubmitService,
            booking_cancel_service_1.BookingCancelService,
            booking_documents_service_1.BookingDocumentsService,
            artist_timeline_service_1.ArtistTimelineService
        ],
        controllers: [booking_controller_1.BookingController],
        exports: [booking_service_1.BookingService]
    })
], BookingModule);
exports.BookingModule = BookingModule;
//# sourceMappingURL=booking.module.js.map