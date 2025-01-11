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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
const paper_util_1 = require("./paper-util");
const mongoose_1 = require("@nestjs/mongoose");
const paper_model_1 = require("./paper-model");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const booking_service_1 = require("../booking/services/booking.service");
const contract_paper_data_povider_1 = require("./generators/contract-paper-data-povider");
const tech_rider_data_provider_1 = require("./generators/tech-rider-data.provider");
const pdf_generator_service_1 = require("../pdf/pdf-generator.service");
const pdf_util_1 = require("../pdf/pdf.util");
const booking_util_1 = require("../booking/util/booking.util");
const signature_service_1 = require("./signature.service");
const pdf_data_service_1 = require("../pdf/pdf-data.service");
let DocumentService = class DocumentService {
    constructor(paperModel, bookingService, contractPaperDataProvider, techRiderDataProvider, pdfGeneratorService, pdfDataService, signatureService) {
        this.paperModel = paperModel;
        this.bookingService = bookingService;
        this.contractPaperDataProvider = contractPaperDataProvider;
        this.techRiderDataProvider = techRiderDataProvider;
        this.pdfGeneratorService = pdfGeneratorService;
        this.pdfDataService = pdfDataService;
        this.signatureService = signatureService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    fetchBookingPapers(formId) {
        return this.paperModel.find({ formId: formId }).select({
            content: false,
        }).exec();
    }
    fetchPaper(id) {
        return this.paperModel.findOne({ id }).select({
            contentWithSignatures: false,
        }).exec();
    }
    getPaper(id) {
        return this.paperModel.findOne({ id }).exec();
    }
    async storeBookingPaper(buffer, ctx, template) {
        const paper = new this.paperModel({
            id: (0, uuid_1.v4)(),
            formId: ctx.booking.formId,
            template: template,
            content: buffer,
            extension: 'pdf',
            uid: ctx.profile.uid,
            generationTime: new Date(),
            status: 'GENERATED'
        });
        await paper.save();
        this.logger.log(`Paper saved: ${paper.template} with status: ${paper.status} by ${paper.uid}`);
        return paper;
    }
    async storeUploadPaper(buffer, ctx, template, extension) {
        const paper = new this.paperModel({
            id: (0, uuid_1.v4)(),
            formId: ctx.booking.formId,
            template: template,
            content: buffer,
            extension: extension,
            uid: ctx.profile.uid,
            generationTime: new Date(),
            status: 'UPLOADED'
        });
        await paper.save();
        this.logger.log(`Paper saved: ${paper.template} with status: ${paper.status} by ${paper.uid}`);
        return paper;
    }
    async updatePaper(paper) {
        const update = await this.paperModel.updateOne({ id: paper.id }, { $set: paper });
        if (!update.modifiedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Not updated Paper ${paper.id}`);
        }
        return paper;
    }
    async downloadPaper(id, profile) {
        const paper = await this.paperModel.findOne({ id })
            .select({ contentWithSignatures: false })
            .exec();
        if (!paper) {
            throw new common_1.NotFoundException(`Paper ${id} not found`);
        }
        await this.bookingService.hasPermissionToBooking(paper.formId, profile.uid);
        this.logger.log(`Download paper: ${paper.template}, ${paper.id}`);
        return paper;
    }
    deletePaperItem(id) {
        return this.paperModel.deleteOne({ id }).exec();
    }
    async downloadSignedPaper(id, profile) {
        const paper = await this.paperModel.findOne({ id })
            .select({ content: false })
            .exec();
        if (!paper) {
            throw new common_1.NotFoundException(`Not found Paper ${id}`);
        }
        if (!paper.contentWithSignatures) {
            throw new common_1.NotFoundException(`Not found Paper with signatures ${id}`);
        }
        await this.bookingService.hasPermissionToBooking(paper.formId, profile.uid);
        return paper;
    }
    async generatePdf(formId, template, profile) {
        this.logger.log(`Generate PDF ${template} for booking ${formId} by ${profile.uid}`);
        const ctx = await this.bookingService.buildContext(formId, profile);
        const data = await this.prepareData(ctx, template);
        const pdfData = await this.getActivePdfDataForArtistAndManager(ctx, template);
        const buffer = await this.pdfGeneratorService.generate(template, pdfData, data);
        const paper = await this.storeBookingPaper(buffer, ctx, template);
        return paper;
    }
    async getActivePdfDataForArtistAndManager(ctx, template) {
        const artistSignature = ctx.artists[0].signature;
        if (!artistSignature) {
            throw new illegal_state_exception_1.IllegalStateException(`Artist signature missing`);
        }
        const pdfData = await this.pdfDataService.find({
            artistSignature,
            managerUid: ctx.booking.managerUid,
            template,
            active: true
        });
        if (!pdfData) {
            this.logger.log(`Not found active PdfData ${template} for booking ${ctx.booking.formId}`);
            return pdf_util_1.PdfUtil.prepareDefaultPdfData(template);
        }
        return pdfData.toObject();
    }
    async generateSignedPaper(paperId, signatureId, profile) {
        const paper = await this.getPaper(paperId);
        if (!paper) {
            throw new common_1.NotFoundException(`Not found Paper ${paperId}`);
        }
        const template = paper.template;
        const ctx = await this.bookingService.buildContext(paper.formId, profile);
        this.logger.log(`Generate Paper with signatures ${paper.template} for booking ${ctx.booking.formId} by ${ctx.profile.uid}`);
        let data = await this.prepareData(ctx, template);
        await this.updatePaperSignatures(paper, signatureId, ctx);
        paper_util_1.PaperUtil.addSignaturesData(data, paper.signatures);
        const pdfData = await this.getActivePdfDataForArtistAndManager(ctx, template);
        const buffer = await this.pdfGeneratorService.generate(template, pdfData, data);
        paper.contentWithSignatures = buffer;
        paper.status = paper_util_1.PaperUtil.resolvePaperStatus(paper);
        await this.updatePaper(paper);
        return paper;
    }
    prepareData(ctx, template) {
        if (template === 'contract') {
            return this.contractPaperDataProvider.prepareData(ctx);
        }
        if (template === 'tech-rider') {
            return this.techRiderDataProvider.prepareData(ctx);
        }
        throw new common_1.BadRequestException(`Not found data provider for template: ${template}`);
    }
    async updatePaperSignatures(paper, signatureId, ctx) {
        const bookingRoles = booking_util_1.BookingUtil.bookingRoles(ctx.booking, ctx.profile.uid);
        if (!bookingRoles.length) {
            throw new common_1.UnauthorizedException(`Profile ${ctx.profile.uid} has no access to Booking ${ctx.booking.formId} -> Paper ${paper.formId}`);
        }
        const signature = await this.signatureService.fetch(signatureId, ctx.profile.uid);
        if (!(signature === null || signature === void 0 ? void 0 : signature.base64data)) {
            throw new common_1.NotFoundException(`Not found Signature ${signatureId}`);
        }
        const signatures = paper.signatures || [];
        bookingRoles.forEach(role => {
            const signatureToUpdate = signatures.find(s => s.role === role);
            if (signatureToUpdate) {
                signatureToUpdate.base64 = signature.base64data;
            }
            else {
                signatures.push({ base64: signature.base64data, role: role });
            }
            this.logger.log(`Added Signature ${signatureId} of role: ${role} to Paper ${paper.id}`);
        });
        paper.signatures = signatures;
    }
};
DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(paper_model_1.Paper.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        booking_service_1.BookingService,
        contract_paper_data_povider_1.ContractPaperDataProvider,
        tech_rider_data_provider_1.TechRiderDataProvider,
        pdf_generator_service_1.PdfGeneratorService,
        pdf_data_service_1.PdfDataService,
        signature_service_1.SignatureService])
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map