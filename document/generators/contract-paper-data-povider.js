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
exports.ContractPaperDataProvider = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("../../profile/profile.service");
const illegal_state_exception_1 = require("../../global/exceptions/illegal-state.exception");
const paper_util_1 = require("../paper-util");
const booking_util_1 = require("../../booking/util/booking.util");
const util_1 = require("../../global/utils/util");
const form_util_1 = require("../../form/form.util");
const event_util_1 = require("../../event/event-util");
let ContractPaperDataProvider = class ContractPaperDataProvider {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async prepareData(ctx) {
        const formData = ctx.booking.formData;
        if (!formData) {
            throw new illegal_state_exception_1.IllegalStateException('Missing form data');
        }
        const artistProfile = await this.profileService.findByArtistSignature(ctx.artists[0].signature);
        const managerData = await this.profileService.fetchManagerData(ctx.booking.managerUid);
        const now = new Date();
        const promoterCountry = this.get(formData, 'promoterInformation.companyCountry.name');
        const promoterAddress = this.get(formData, 'promoterInformation.companyAddress');
        const eventCountry = this.get(formData, 'eventInformation.eventCountry.name');
        const eventAddress = this.get(formData, 'eventInformation.venueAddress');
        const artist = ctx.artists[0];
        const artistCountry = artist.country.name;
        return {
            year: now.getFullYear().toString(),
            promoterName: `${this.get(formData, 'promoterInformation.promoterFirstName')} ${this.get(formData, 'promoterInformation.promoterLastName')}`,
            promoterCompanyName: this.get(formData, 'promoterInformation.companyName'),
            promoterAdress: `${promoterAddress}, ${promoterCountry}`,
            promoterPhone: this.get(formData, 'promoterInformation.phoneNumber'),
            promoterEmail: this.get(formData, 'promoterInformation.email'),
            artistName: artist.name,
            artistRealName: `${artistProfile.firstName} ${artistProfile.lastName}`,
            artistPerformance: `???`,
            artistCountry: artistCountry,
            artistFee: '??',
            eventName: ctx.event.name,
            eventDate: event_util_1.EventUtil.dateString(ctx.event),
            eventVenue: `${eventAddress}, ${eventCountry}`,
            agencyName: managerData.agencyName,
            agencyCompanyName: managerData.agencyCompanyName,
            accountHolder: managerData.accountHolder,
            nameOfBank: managerData.nameOfBank,
            accountAddress: managerData.accountAddress,
            accountNumber: managerData.accountNumber,
            accountSwift: managerData.accountSwift,
            agencyEmail: managerData.agencyEmail,
            agencyPhone: managerData.agencyPhone,
            agencyFooterString: paper_util_1.PaperUtil.agencyString(managerData),
            depositDeadline: util_1.Util.formatDate(booking_util_1.BookingUtil.depositDeadline(ctx.event)),
            feeDeadline: util_1.Util.formatDate(booking_util_1.BookingUtil.feeDeadline(ctx.event)),
            contractDate: util_1.Util.formatDate(now),
        };
    }
    get(formData, path) {
        return form_util_1.FormUtil.get(formData, path);
    }
};
ContractPaperDataProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ContractPaperDataProvider);
exports.ContractPaperDataProvider = ContractPaperDataProvider;
//# sourceMappingURL=contract-paper-data-povider.js.map