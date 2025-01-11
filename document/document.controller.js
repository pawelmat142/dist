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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../profile/auth/jwt.guard");
const serialize_interceptor_1 = require("../global/interceptors/serialize.interceptor");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const paper_model_1 = require("./paper-model");
const document_service_1 = require("./document.service");
const profile_path_param_getter_1 = require("../profile/auth/profile-path-param-getter");
const paper_util_1 = require("./paper-util");
const checklist_service_1 = require("./checklist.service");
const signature_model_1 = require("./signature.model");
const signature_service_1 = require("./signature.service");
const platform_express_1 = require("@nestjs/platform-express");
const uploads_service_1 = require("./uploads.service");
const role_guard_1 = require("../profile/auth/role.guard");
const role_1 = require("../profile/model/role");
const multer_1 = require("multer");
let DocumentController = class DocumentController {
    constructor(documentService, checklistService, signatureService, uploadsService) {
        this.documentService = documentService;
        this.checklistService = checklistService;
        this.signatureService = signatureService;
        this.uploadsService = uploadsService;
    }
    refreshChecklist(formId, profile) {
        return this.checklistService.refreshChecklist(formId, profile);
    }
    async downloadPaper(res, id, profile) {
        const paper = await this.documentService.downloadPaper(id, profile);
        if (!paper) {
            throw new common_1.NotFoundException();
        }
        paper_util_1.PaperUtil.fileResponse(res, paper.content, `${paper.template}.${paper.extension}`);
    }
    async generate(res, formId, template, profile) {
        const paper = await this.documentService.generatePdf(formId, template, profile);
        paper_util_1.PaperUtil.fileResponse(res, paper.content, `${paper.template}.${paper.extension}`);
    }
    async signPaper(res, paperId, signatureId, profile) {
        const paper = await this.documentService.generateSignedPaper(paperId, signatureId, profile);
        paper_util_1.PaperUtil.fileResponse(res, paper.contentWithSignatures, `${paper.template}-signed.${paper.extension}`);
    }
    async downloadSignedPaper(res, id, profile) {
        const paper = await this.documentService.downloadSignedPaper(id, profile);
        paper_util_1.PaperUtil.fileResponse(res, paper.contentWithSignatures, `${paper.template}-signed.${paper.extension}`);
    }
    deletePaper(id, profile) {
        return this.uploadsService.deletePaper(id, profile);
    }
    async uploadFile(formId, template, profile, file) {
        return this.uploadsService.uploadPaperFile(formId, template, profile, file);
    }
    verifyPaperFile(paperId, profile) {
        this.uploadsService.verifyPaperFile(paperId, profile);
    }
    async downloadFile(paperId, res, profile) {
        const paper = await this.uploadsService.downloadFile(paperId, profile);
        paper_util_1.PaperUtil.fileResponse(res, paper.content, `${paper.template}.${paper.extension}`);
    }
    listSignatures(profile) {
        return this.signatureService.listSignatures(profile.uid);
    }
    putSignature(dto, profile) {
        return this.signatureService.putSignature(dto, profile);
    }
    cancelSignature(id, profile) {
        return this.signatureService.cancelSignature(id, profile.uid);
    }
};
__decorate([
    (0, common_1.Get)('/refresh-checklist/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "refreshChecklist", null);
__decorate([
    (0, common_1.Get)('/download/:id'),
    (0, serialize_interceptor_1.Serialize)(paper_model_1.Paper),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "downloadPaper", null);
__decorate([
    (0, common_1.Get)('/generate/:id/:template'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('template')),
    __param(3, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('/sign/:paperid/:signatureid'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('paperid')),
    __param(2, (0, common_1.Param)('signatureid')),
    __param(3, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "signPaper", null);
__decorate([
    (0, common_1.Get)('/download-signed/:id'),
    (0, serialize_interceptor_1.Serialize)(paper_model_1.Paper),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "downloadSignedPaper", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "deletePaper", null);
__decorate([
    (0, common_1.Post)('upload/:id/:template'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('template')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_1.Role.MANAGER)),
    (0, common_1.Post)('/verify/:paperId'),
    __param(0, (0, common_1.Param)('paperId')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "verifyPaperFile", null);
__decorate([
    (0, common_1.Get)('/upload/:paperId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('paperId')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Get)('/signatures'),
    (0, serialize_interceptor_1.Serialize)(signature_model_1.Signature),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "listSignatures", null);
__decorate([
    (0, common_1.Put)('/signature'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "putSignature", null);
__decorate([
    (0, common_1.Delete)('/signature/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "cancelSignature", null);
DocumentController = __decorate([
    (0, common_1.Controller)('api/document'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [document_service_1.DocumentService,
        checklist_service_1.ChecklistService,
        signature_service_1.SignatureService,
        uploads_service_1.UploadsService])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map