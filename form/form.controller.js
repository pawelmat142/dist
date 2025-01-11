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
exports.FormController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const form_model_1 = require("./form.model");
const mongoose_2 = require("mongoose");
const not_modified_exception_1 = require("../global/exceptions/not-modified.exception");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const form_service_1 = require("./form.service");
let FormController = class FormController {
    constructor(formModel, formService) {
        this.formModel = formModel;
        this.formService = formService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    fetchSubmitted(formType) {
        return this.formModel.find({ formType, formStatus: 'SUBMITTED' });
    }
    async openForm(id) {
        const form = await this.formModel.findOne({ id });
        if (!form) {
            throw new common_1.NotFoundException(`Not found booking form with id ${id}`);
        }
        this.logger.log(`Opening form with id: ${id}`);
        return form;
    }
    async startForm(formType, data) {
        return this.formService.startForm(formType, data);
    }
    async storeForm(id, data) {
        const update = await this.formModel.updateOne({ id: id }, { $set: {
                data: data,
                modified: new Date()
            } });
        if (!update.modifiedCount) {
            throw new not_modified_exception_1.NotModifiedException();
        }
        if (!update.matchedCount) {
            throw new common_1.NotFoundException(`Not found form with id: ${id}`);
        }
        this.logger.log(`Stored form with id ${id}`);
    }
    async submitForm(id, data) {
        const update = await this.formModel.updateOne({ id: id }, { $set: {
                data: data,
                modified: new Date(),
                formStatus: 'SUBMITTED'
            } });
        if (!update.modifiedCount) {
            throw new not_modified_exception_1.NotModifiedException();
        }
        if (!update.matchedCount) {
            throw new common_1.NotFoundException(`Not found form with id: ${id}`);
        }
        this.logger.log(`Submitted form with id ${id}`);
    }
};
__decorate([
    (0, common_1.Get)('/submitted/:formType'),
    __param(0, (0, common_1.Param)('formType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FormController.prototype, "fetchSubmitted", null);
__decorate([
    (0, common_1.Get)('/open/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "openForm", null);
__decorate([
    (0, common_1.Post)('/start/:formType'),
    __param(0, (0, common_1.Param)('formType')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "startForm", null);
__decorate([
    (0, common_1.Put)('/store/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "storeForm", null);
__decorate([
    (0, common_1.Put)('/submit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "submitForm", null);
FormController = __decorate([
    (0, common_1.Controller)('api/form'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    __param(0, (0, mongoose_1.InjectModel)(form_model_1.Form.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        form_service_1.FormService])
], FormController);
exports.FormController = FormController;
//# sourceMappingURL=form.controller.js.map