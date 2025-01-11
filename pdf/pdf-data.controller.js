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
exports.PdfDataController = void 0;
const common_1 = require("@nestjs/common");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const pdf_data_service_1 = require("./pdf-data.service");
const pdf_data_1 = require("./model/pdf-data");
const role_guard_1 = require("../profile/auth/role.guard");
const role_1 = require("../profile/model/role");
const profile_path_param_getter_1 = require("../profile/auth/profile-path-param-getter");
const serialize_interceptor_1 = require("../global/interceptors/serialize.interceptor");
const paper_util_1 = require("../document/paper-util");
let PdfDataController = class PdfDataController {
    constructor(pdfDataService) {
        this.pdfDataService = pdfDataService;
    }
    getDefaultPdfData(template) {
        return this.pdfDataService.getDefaultPdfData(template);
    }
    list(artistSignature, profile) {
        return this.pdfDataService.list(artistSignature, profile.uid);
    }
    getByName(name, artistSignature, profile) {
        return this.pdfDataService.getByName(name, artistSignature, profile.uid);
    }
    save(artistSignature, dto, profile) {
        return this.pdfDataService.save(artistSignature, dto, profile);
    }
    delete(id, profile) {
        return this.pdfDataService.delete(id, profile);
    }
    activate(id, template, profile) {
        return this.pdfDataService.activate(id, profile, template);
    }
    deactivate(id, template, profile) {
        return this.pdfDataService.deactivate(id, profile, template);
    }
    async generatePreview(res, id, profile) {
        const buffer = await this.pdfDataService.generatePreview(id, profile);
        paper_util_1.PaperUtil.fileResponse(res, buffer, `preview.pdf`);
    }
    async generatePreviewDefault(res, template) {
        const buffer = await this.pdfDataService.generatePreviewDefault(template);
        paper_util_1.PaperUtil.fileResponse(res, buffer, `preview.pdf`);
    }
};
__decorate([
    (0, common_1.Get)('/default/:template'),
    __param(0, (0, common_1.Param)('template')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "getDefaultPdfData", null);
__decorate([
    (0, common_1.Get)('/list/:artistSignature'),
    (0, serialize_interceptor_1.Serialize)(pdf_data_1.PdfDataDto),
    __param(0, (0, common_1.Param)('artistSignature')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/name/:name/:artistSignature'),
    (0, serialize_interceptor_1.Serialize)(pdf_data_1.PdfDataDto),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('artistSignature')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "getByName", null);
__decorate([
    (0, common_1.Put)('save/:artistSignature'),
    (0, serialize_interceptor_1.Serialize)(pdf_data_1.PdfDataDto),
    __param(0, (0, common_1.Param)('artistSignature')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pdf_data_1.PdfDataDto, Object]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "save", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/activate/:id/:template'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('template')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "activate", null);
__decorate([
    (0, common_1.Get)('/deactivate/:id/:template'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('template')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PdfDataController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Get)('/preview/:id/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PdfDataController.prototype, "generatePreview", null);
__decorate([
    (0, common_1.Get)('/preview-default/:template'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('template')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PdfDataController.prototype, "generatePreviewDefault", null);
PdfDataController = __decorate([
    (0, common_1.Controller)('api/pdf-data'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_1.Role.MANAGER)),
    __metadata("design:paramtypes", [pdf_data_service_1.PdfDataService])
], PdfDataController);
exports.PdfDataController = PdfDataController;
//# sourceMappingURL=pdf-data.controller.js.map