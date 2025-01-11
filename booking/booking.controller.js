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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../profile/auth/jwt.guard");
const profile_path_param_getter_1 = require("../profile/auth/profile-path-param-getter");
const serialize_interceptor_1 = require("../global/interceptors/serialize.interceptor");
const booking_dto_1 = require("./model/booking.dto");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const booking_service_1 = require("./services/booking.service");
const booking_cancel_service_1 = require("./services/booking-cancel.service");
const booking_documents_service_1 = require("./services/booking-documents.service");
const no_guard_1 = require("../profile/auth/no-guard");
const artist_timeline_service_1 = require("./services/artist-timeline.service");
let BookingController = class BookingController {
    constructor(bookingService, bookingCancelService, bookingDocumentsService, artistTimelineService) {
        this.bookingService = bookingService;
        this.bookingCancelService = bookingCancelService;
        this.bookingDocumentsService = bookingDocumentsService;
        this.artistTimelineService = artistTimelineService;
    }
    submitForm(formId, profile) {
        return this.bookingService.submitForm(formId, profile);
    }
    fetchProfileBookings(profile) {
        return this.bookingService.fetchProfileBookings(profile);
    }
    fetchFormData(formId, profile) {
        return this.bookingService.fetchFormData(formId, profile);
    }
    findPromoterInfo(profile) {
        return this.bookingService.findPromoterInfo(profile === null || profile === void 0 ? void 0 : profile.uid);
    }
    cancelBooking(formId, profile) {
        return this.bookingCancelService.cancelBooking(formId, profile);
    }
    requestDocuments(formId, profile) {
        return this.bookingDocumentsService.requestDocuments(formId, profile);
    }
    artistTimeline(artistSignature) {
        return this.artistTimelineService.getTimeline(artistSignature);
    }
    panelArtistBookings(artistSignature, profile) {
        return this.bookingService.panelArtistBookings(artistSignature, profile);
    }
    fetchFullBooking(formId, profile) {
        return this.bookingService.fetchFullBooking(formId, profile);
    }
};
__decorate([
    (0, common_1.Get)('submit/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "submitForm", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)(serialize_interceptor_1.SerializeBookingDto),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "fetchProfileBookings", null);
__decorate([
    (0, common_1.Get)('form-data/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "fetchFormData", null);
__decorate([
    (0, common_1.Get)('promoter-info'),
    (0, common_1.UseGuards)(no_guard_1.NoGuard),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findPromoterInfo", null);
__decorate([
    (0, common_1.Get)('cancel/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, serialize_interceptor_1.Serialize)(booking_dto_1.BookingDto),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)('request-documents/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, serialize_interceptor_1.Serialize)(booking_dto_1.BookingDto),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "requestDocuments", null);
__decorate([
    (0, common_1.Get)('artist-timeline/:signature'),
    __param(0, (0, common_1.Param)('signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "artistTimeline", null);
__decorate([
    (0, common_1.Get)('panel-artist-bookings/:signature'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('signature')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "panelArtistBookings", null);
__decorate([
    (0, common_1.Get)('fetch-full/:formId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)(serialize_interceptor_1.SerializeBookingDto),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "fetchFullBooking", null);
BookingController = __decorate([
    (0, common_1.Controller)('api/booking'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        booking_cancel_service_1.BookingCancelService,
        booking_documents_service_1.BookingDocumentsService,
        artist_timeline_service_1.ArtistTimelineService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map