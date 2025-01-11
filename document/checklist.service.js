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
exports.ChecklistService = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../booking/services/booking.service");
const document_service_1 = require("./document.service");
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
const booking_util_1 = require("../booking/util/booking.util");
let ChecklistService = class ChecklistService {
    constructor(bookingService, documentService) {
        this.bookingService = bookingService;
        this.documentService = documentService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async refreshChecklist(formId, profile) {
        const ctx = await this.bookingService.buildSimpleContext(formId, profile);
        const status = ctx.booking.status;
        if (status !== 'DOCUMENTS') {
            this.logger.warn(`Skip refresh checklist for booking ${ctx.booking.formId} with status: ${status}`);
            return;
        }
        this.logger.log(`Refresh checklist for booking ${ctx.booking.formId} by ${profile.uid}`);
        const papers = await this.documentService.fetchBookingPapers(ctx.booking.formId);
        this.logger.log(`Found ${papers.length} Paper`);
        let updateFlag = false;
        for (let item of ctx.booking.checklist) {
            const paper = papers.find(p => p.template === item.template);
            item.paperId = paper === null || paper === void 0 ? void 0 : paper.id;
            for (let step of item.steps) {
                if (this.markStep(item, step, paper)) {
                    updateFlag = true;
                }
            }
        }
        if (this.checklistReady(ctx)) {
            ctx.booking.status = 'CHECKLIST_COMPLETE';
            booking_util_1.BookingUtil.addStatusToHistory(ctx.booking, profile);
            this.logger.warn(`Checklist completed for booking ${ctx.booking.formId}`);
            updateFlag = true;
        }
        if (updateFlag) {
            await this.bookingService.update(ctx.booking);
            return ctx.booking.checklist;
        }
        else {
            this.logger.log(`Checklist without changes for booking ${ctx.booking.formId}`);
        }
    }
    checklistReady(ctx) {
        return ctx.booking.checklist.every(item => {
            const lastStep = this.lastStep(item);
            return lastStep.ready;
        });
    }
    lastStep(item) {
        const lastStep = item.steps[item.steps.length - 1];
        if (!lastStep) {
            throw new illegal_state_exception_1.IllegalStateException(`Checklist item step error`);
        }
        return lastStep;
    }
    markStep(item, step, paper) {
        switch (step.type) {
            case 'generate': return this.updateStep(item.name, step, !!paper);
            case 'sign': return this.updateStep(item.name, step, (paper === null || paper === void 0 ? void 0 : paper.status) === 'SIGNED');
            case 'verifyAndSign': return this.updateStep(item.name, step, (paper === null || paper === void 0 ? void 0 : paper.status) === 'VERIFIED');
            case 'upload': return this.updateStep(item.name, step, (paper === null || paper === void 0 ? void 0 : paper.status) === 'UPLOADED');
            case 'verify': return this.updateStep(item.name, step, (paper === null || paper === void 0 ? void 0 : paper.status) === 'VERIFIED');
            default: return false;
        }
    }
    updateStep(name, step, readyCondition) {
        if (step.ready && !readyCondition) {
            step.ready = undefined;
            this.logger.log(`Document ${name}, step [${step.type}] removed ready flag!`);
            return true;
        }
        if (!step.ready && readyCondition) {
            step.ready = new Date();
            this.logger.log(`Document ${name}, step [${step.type}] completed!`);
            return true;
        }
        return false;
    }
};
ChecklistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        document_service_1.DocumentService])
], ChecklistService);
exports.ChecklistService = ChecklistService;
//# sourceMappingURL=checklist.service.js.map