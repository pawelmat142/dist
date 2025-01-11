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
exports.PdfDataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pdf_data_model_1 = require("./model/pdf-data.model");
const pdf_util_1 = require("./pdf.util");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
const pdf_generator_service_1 = require("./pdf-generator.service");
let PdfDataService = class PdfDataService {
    constructor(pdfDataModel, pdfGeneratorService) {
        this.pdfDataModel = pdfDataModel;
        this.pdfGeneratorService = pdfGeneratorService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    find(filter) {
        return this.pdfDataModel.findOne(filter).exec();
    }
    getDefaultPdfData(tempalte) {
        return pdf_util_1.PdfUtil.prepareDefaultPdfData(tempalte);
    }
    list(artistSignature, managerUid) {
        return this.pdfDataModel.find({
            artistSignature,
            managerUid
        }, {
            sections: false
        }).exec();
    }
    getByName(name, artistSignature, managerUid) {
        return this.get(name, artistSignature, managerUid);
    }
    async save(artistSignature, dto, profile) {
        if (dto.id) {
            const existing = await this.getById(dto.id, profile.uid);
            if (existing) {
                await this.update(dto);
                return this.getById(dto.id, profile.uid);
            }
        }
        const newPdfData = await this.create(artistSignature, dto, profile);
        this.logger.log(`Created new PdfData for artist ${newPdfData.artistSignature}, manager: ${newPdfData.managerUid}`);
        return newPdfData;
    }
    async delete(id, profile) {
        const deleted = await this.pdfDataModel.deleteOne({
            id,
            managerUid: profile.uid
        }).exec();
        if (!deleted.deletedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Not found PdfData ${id}`);
        }
        this.logger.log(`Deleted PdfData ${id}`);
    }
    async activate(id, profile, template) {
        if (!template) {
            throw new common_1.NotFoundException(`PdfTemplate not provided`);
        }
        const pdfData = await this.getById(id, profile.uid);
        if (!pdfData) {
            throw new common_1.NotFoundException(`Not found PdfData ${id}`);
        }
        await this.pdfDataModel.updateMany({
            managerUid: profile.uid,
            artistSignature: pdfData.artistSignature,
            id: { $ne: id },
            template,
        }, { $set: { active: false } });
        const update = await this.pdfDataModel.updateOne({
            managerUid: profile.uid,
            artistSignature: pdfData.artistSignature,
            template,
            id
        }, { $set: { active: true } });
        if (!update.modifiedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Activation failed`);
        }
        this.logger.log(`Activated PdfData ${id}, for Artist ${pdfData.artistSignature}, by ${profile.uid}`);
    }
    async deactivate(id, profile, template) {
        if (!template) {
            throw new common_1.NotFoundException(`PdfTemplate not provided`);
        }
        const pdfData = await this.getById(id, profile.uid);
        if (!pdfData) {
            throw new common_1.NotFoundException(`Not found PdfData ${id}`);
        }
        const update = await this.pdfDataModel.updateOne({
            managerUid: profile.uid,
            artistSignature: pdfData.artistSignature,
            template,
            id
        }, { $set: { active: false } });
        if (!update.modifiedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Activation failed`);
        }
        this.logger.log(`Deactivated PdfData ${id}, for Artist ${pdfData.artistSignature}, by ${profile.uid}`);
    }
    async update(dto) {
        const update = await this.pdfDataModel.updateOne({ id: dto.id }, { $set: {
                name: dto.name,
                header: dto.header,
                sections: dto.sections,
                modified: new Date(),
            } }).exec();
        if (!update.modifiedCount) {
            throw new illegal_state_exception_1.IllegalStateException(`Not updated PdfData ${dto.id}`);
        }
        this.logger.log(`Updated PdfData ${dto.id}, name: ${dto.name}`);
    }
    create(artistSignature, dto, profile) {
        const pdfData = new this.pdfDataModel(Object.assign(Object.assign({}, dto), { id: (0, uuid_1.v4)(), active: false, created: new Date(), modified: new Date(), managerUid: profile.uid, artistSignature }));
        return pdfData.save();
    }
    getById(id, managerUid) {
        return this.pdfDataModel.findOne({ id, managerUid }).exec();
    }
    get(name, artistSignature, managerUid) {
        return this.pdfDataModel.findOne({
            name,
            artistSignature,
            managerUid
        }).exec();
    }
    async generatePreview(id, profile) {
        const pdfData = await this.pdfDataModel.findOne({
            id,
            managerUid: profile.uid
        }).exec();
        if (!pdfData) {
            throw new common_1.NotFoundException(`Not found PdfData wth id: ${id} by ${profile.uid}`);
        }
        const buffer = await this.pdfGeneratorService.generate(pdfData.template, pdfData.toObject());
        return buffer;
    }
    async generatePreviewDefault(template) {
        const buffer = await this.pdfGeneratorService.generate(template);
        return buffer;
    }
};
PdfDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pdf_data_model_1.PdfData.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        pdf_generator_service_1.PdfGeneratorService])
], PdfDataService);
exports.PdfDataService = PdfDataService;
//# sourceMappingURL=pdf-data.service.js.map