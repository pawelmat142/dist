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
exports.FormService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const form_model_1 = require("./form.model");
const mongoose_2 = require("mongoose");
let FormService = class FormService {
    constructor(formModel) {
        this.formModel = formModel;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    findForm(id) {
        return this.formModel.findOne({ id });
    }
    async startForm(formType, data) {
        const formId = this.generateFormId(formType);
        const form = new this.formModel({
            id: formId,
            formType: formType,
            formStatus: 'PROGRESS',
            data: data,
            created: new Date(),
            modified: new Date()
        });
        const saved = await form.save();
        this.logger.log(`Started form ${formId}`);
        return { formId };
    }
    async submitForm(id) {
        const update = await this.formModel.updateOne({ id }, { $set: { formStatus: 'SUBMITTED' } });
        if (!update.modifiedCount) {
            this.logger.warn(`Not found form to submit: ${id}`);
        }
    }
    generateFormId(formType) {
        return `${formType.replace(' ', '_')}-${Date.now().toString().slice(-4)}`;
    }
};
FormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(form_model_1.Form.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FormService);
exports.FormService = FormService;
//# sourceMappingURL=form.service.js.map