"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGeneratorModule = void 0;
const common_1 = require("@nestjs/common");
const data_generator_controller_1 = require("./data-generator.controller");
const data_generator_service_1 = require("./data-generator.service");
const profile_module_1 = require("../profile/profile.module");
const artist_module_1 = require("../artist/artist.module");
const artists_generator_1 = require("./data/artists-generator");
const booking_module_1 = require("../booking/booking.module");
const form_module_1 = require("../form/form.module");
const bookings_generator_1 = require("./data/bookings-generator");
let DataGeneratorModule = class DataGeneratorModule {
};
DataGeneratorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            profile_module_1.ProfileModule,
            artist_module_1.ArtistModule,
            booking_module_1.BookingModule,
            form_module_1.FormModule,
        ],
        controllers: [data_generator_controller_1.DataGeneratorController],
        providers: [
            data_generator_service_1.DataGeneratorService,
            artists_generator_1.ArtistsGenerator,
            bookings_generator_1.BookingsGenerator,
        ]
    })
], DataGeneratorModule);
exports.DataGeneratorModule = DataGeneratorModule;
//# sourceMappingURL=data-generator.module.js.map