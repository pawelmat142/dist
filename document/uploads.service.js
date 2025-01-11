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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../booking/services/booking.service");
const document_service_1 = require("./document.service");
const message_exception_1 = require("../global/exceptions/message-exception");
let UploadsService = class UploadsService {
    constructor(bookingService, documentService) {
        this.bookingService = bookingService;
        this.documentService = documentService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.UPLOAD_EXTENSIONS = ['jpg', 'jpeg', 'pdf'];
        this.UPLOAD_TEMPLATES = ['rental-proof'];
        this.MAX_FILE_BYTES = 1100000;
    }
    async uploadPaperFile(formId, template, profile, file) {
        this.logger.log(`[START] Upload file ${file.originalname}, Template: ${template}, by: ${profile.uid}, Booking: ${formId}`);
        const extension = this.validateUploadFile(file, template);
        const ctx = await this.bookingService.buildSimpleContext(formId, profile);
        if (ctx.booking.promoterUid !== profile.uid) {
            throw new common_1.UnauthorizedException(`Profile ${profile.uid} has no permission to Booking ${ctx.booking.formId}`);
        }
        const paper = await this.documentService.storeUploadPaper(file.buffer, ctx, template, extension);
        this.logger.log(`[STOP] Upload file ${file.originalname}, Template: ${template}, by: ${profile.uid}, Booking: ${formId}`);
        return paper;
    }
    validateUploadFile(file, template) {
        if (!file.buffer) {
            throw new common_1.BadRequestException(`No buffer when upload file`);
        }
        if (file.size > this.MAX_FILE_BYTES) {
            throw new message_exception_1.MessageException(`Max file size 1 MB`);
        }
        if (!this.UPLOAD_TEMPLATES.includes(template)) {
            throw new common_1.BadRequestException(`Wrong template ${template} for upload`);
        }
        const extension = file.mimetype.split('/').pop();
        if (!extension) {
            throw new message_exception_1.MessageException(`Could not specify extension, mimetype: ${file.mimetype}`);
        }
        if (!this.UPLOAD_EXTENSIONS.includes(extension)) {
            throw new message_exception_1.MessageException(`Wrong extension ${extension}`);
        }
        return extension;
    }
    async verifyPaperFile(paperId, profile) {
        const paper = await this.documentService.getPaper(paperId);
        if (!paper) {
            throw new common_1.NotFoundException(`Not found Paper with id ${paperId}`);
        }
        await this.bookingService.hasPermissionToBooking(paper.formId, profile.uid);
        paper.status = 'VERIFIED';
        await this.documentService.updatePaper(paper);
        this.logger.log(`Verified Paper ${paper.id}, by ${profile.uid}`);
    }
    async downloadFile(paperId, profile) {
        const paper = await this.documentService.fetchPaper(paperId);
        if (!paper) {
            throw new common_1.NotFoundException(`Paper ${paperId} not found`);
        }
        await this.bookingService.hasPermissionToBooking(paper.formId, profile.uid);
        return paper;
    }
    async deletePaper(id, profile) {
        const paper = await this.documentService.fetchPaper(id);
        if (!paper) {
            throw new common_1.NotFoundException(`Paper ${id} not found`);
        }
        await this.bookingService.hasPermissionToBooking(paper.formId, profile.uid);
        const update = await this.documentService.deletePaperItem(id);
        if (update.deletedCount) {
            this.logger.log(`Deleter Paper ${paper.id}`);
        }
        else {
            this.logger.warn(`Counld not delete Paper ${paper.id}`);
        }
        return { deleted: !!update.deletedCount };
    }
};
UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        document_service_1.DocumentService])
], UploadsService);
exports.UploadsService = UploadsService;
//# sourceMappingURL=uploads.service.js.map