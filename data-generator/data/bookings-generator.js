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
exports.BookingsGenerator = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../../booking/services/booking.service");
const date_util_1 = require("../../global/utils/date.util");
const form_service_1 = require("../../form/form.service");
const book_forms_1 = require("./book-forms");
const countries_1 = require("./countries");
const util_1 = require("../../global/utils/util");
const event_data_1 = require("./event-data");
const gen_util_1 = require("../gen.util");
let BookingsGenerator = class BookingsGenerator {
    constructor(bookingService, formService) {
        this.bookingService = bookingService;
        this.formService = formService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.PROMOTERS = [];
        this.ARTISTS = [];
        this.BOOKINGS = [];
        this.boookingsIterator = 0;
        this._eventNames = [];
        this._eventNamesIterator = 0;
    }
    async generate(PROMOTERS, ARTISTS) {
        this.logger.log(`[START] bookings generate`);
        this.PROMOTERS = PROMOTERS;
        this.ARTISTS = ARTISTS;
        await this.getneratePromoterZeroBookings();
        await this.getneratePromoterOneBookings();
        this.logger.log(`[STOP] bookings generate`);
        return this.BOOKINGS;
    }
    async getneratePromoterZeroBookings() {
        this.logger.log(`[START] promoter ZERO bookings generate`);
        const promoter = this.PROMOTERS[0];
        if (!promoter) {
            this.logger.log(`[SKIP] not found promoter ZERO`);
            return;
        }
        this._eventNames = [];
        const eventName = 'Sunset Reverie';
        const months1 = [-22, -18, -10, -2, 4, 5, 7];
        for (let i = 0; i < months1.length; i++) {
            const addMonths = months1[i];
            const event = this.getEventInformation(`${eventName}`, countries_1.COUNTRIES[6], addMonths, 1);
            const booking = await this.generateBooking(promoter, this.ARTISTS[0], event, 'READY');
        }
        const eventName1 = 'Into the Horizon';
        const months2 = [-3, -2, -1, 0, 1, 2, 3];
        for (let i = 0; i < months2.length; i++) {
            const addMonths = months2[i];
            const event = this.getEventInformation(`${eventName1}`, countries_1.COUNTRIES[5], addMonths, 1);
            const booking = await this.generateBooking(promoter, this.ARTISTS[8], event, 'READY');
        }
        await this.generateBooking(promoter, this.ARTISTS[1], this.getRandomEventInfo(7), 'DOCUMENTS');
        await this.generateBooking(promoter, this.ARTISTS[2], this.getRandomEventInfo(9), 'READY');
        await this.generateBooking(promoter, this.ARTISTS[3], this.getRandomEventInfo(-8), 'DOCUMENTS');
        await this.generateBooking(promoter, this.ARTISTS[3], this.getRandomEventInfo(-10), 'READY');
        await this.generateBooking(promoter, this.ARTISTS[3], this.getRandomEventInfo(-22), 'READY');
        this.logger.log(`[STOP] promoter ZERO bookings generate`);
    }
    async getneratePromoterOneBookings() {
        this.logger.log(`[START] promoter ONE bookings generate`);
        const promoter = this.PROMOTERS[1];
        if (!promoter) {
            this.logger.log(`[SKIP] not found promoter ONE`);
            return;
        }
        this._eventNames = [];
        const eventName = 'Victory Anthem';
        const months = [-6, -4, -2, 0, 2, 4];
        for (let i = 0; i < months.length; i++) {
            const addMonths = months[i];
            const event = this.getEventInformation(`${eventName}`, countries_1.COUNTRIES[4], addMonths, 1);
            const booking = await this.generateBooking(promoter, this.ARTISTS[7], event, 'READY');
        }
        await this.generateBooking(promoter, this.ARTISTS[4], this.getRandomEventInfo(-1, -2), 'READY');
        await this.generateBooking(promoter, this.ARTISTS[4], this.getRandomEventInfo(-2), 'READY');
        await this.generateBooking(promoter, this.ARTISTS[4], this.getRandomEventInfo(-4, 2), 'SUBMITTED');
        await this.generateBooking(promoter, this.ARTISTS[4], this.getRandomEventInfo(-7), 'CHECKLIST_COMPLETE');
        await this.generateBooking(promoter, this.ARTISTS[5], this.getRandomEventInfo(3), 'DOCUMENTS');
        await this.generateBooking(promoter, this.ARTISTS[5], this.getRandomEventInfo(5, 1), 'SUBMITTED');
        await this.generateBooking(promoter, this.ARTISTS[5], this.getRandomEventInfo(7), 'CANCELED');
        await this.generateBooking(promoter, this.ARTISTS[5], this.getRandomEventInfo(14), 'CANCELED');
        this.logger.log(`[STOP] promoter ONE bookings generate`);
    }
    getRandomEventInfo(startsAfterMonths, days) {
        return this.getEventInformation(this.getEventName(), gen_util_1.Gen.randomCountry(), startsAfterMonths, days);
    }
    async generateBooking(promoter, artist, event, status) {
        const i = this.boookingsIterator++;
        this.logger.log(`[START] ${i} Generate booking`);
        const promoterInformation = this.promoterInfoFromProfie(promoter, i);
        const eventInformation = event ? event : this.getRandomEventInfo(3 + (2 * i), 1);
        const start = new Date(eventInformation.performanceStartDate);
        const bookForm = (0, book_forms_1.getBookForm)({ code: artist.signature, name: artist.name }, promoterInformation, eventInformation);
        const { formId } = await this.formService.startForm('BOOKING', bookForm);
        const booking = await this.bookingService.submitForm(formId, gen_util_1.Gen.toJwtProfile(promoter), { skipValidateDuplicate: true });
        const statusBefore = booking.status;
        if (start < date_util_1.DateUtil.NOW) {
            booking.status = 'READY';
        }
        else {
            booking.status = status;
        }
        if (statusBefore !== booking.status) {
            await this.bookingService.update(booking);
        }
        this.logger.log(`Generated booking ${bookForm.eventInformation.eventName}`);
        this.BOOKINGS.push(booking);
        this.logger.log(`[STOP] ${i} Generate booking`);
        return booking;
    }
    getEventName(name) {
        if (name) {
            return `${name}-${this._eventNamesIterator++}`;
        }
        const eventName = event_data_1.EventData.getRandomEventName(this._eventNames);
        this._eventNames.push(eventName);
        return eventName;
    }
    promoterInfoFromProfie(promoter, index, companyNameSuffif = 'Sonic Creations') {
        const split = promoter.name.split(" ");
        const firstName = split[0];
        const lastName = split[1];
        const country = countries_1.COUNTRIES[index + 1] || countries_1.COUNTRIES[0];
        return {
            promoterFirstName: firstName,
            promoterLastName: lastName,
            companyName: `${promoter.name} ${companyNameSuffif}`,
            companyCountry: country,
            companyAddress: "Via delle Stelle, 22 City",
            companyVatNumber: "987654",
            email: `${util_1.Util.toKebabCase(promoter.name)}@test`,
            phoneNumber: "+39 334 567 8910",
            website: "",
            experienceInOrganizingEvents: "12",
            significantOrganizedPastEvents: ""
        };
    }
    getEventInformation(name, country, startsAfterMonths, days) {
        const start = date_util_1.DateUtil.afterMonths(startsAfterMonths, -startsAfterMonths);
        const end = days ? date_util_1.DateUtil.addDays(start, days) : undefined;
        return {
            performanceStartDate: start,
            performanceEndDate: end,
            eventName: name,
            eventCountry: country,
            venueName: "Piazza della Musica",
            venueAddress: "45, 20121 Milan",
            nearestAirport: "Milan Malpensa Airport",
            website: "www.electricpulsefestival.it",
            venueCapacity: "12000",
            ticketPrice: "120 euro",
            ageRestriction: "18",
            recentArtistsPerformedInVenue: "",
            videoLinkToRecentShow: "https://www.youtube.com/watch?v=TfZJaQQ9UYE"
        };
    }
};
BookingsGenerator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        form_service_1.FormService])
], BookingsGenerator);
exports.BookingsGenerator = BookingsGenerator;
//# sourceMappingURL=bookings-generator.js.map