"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("./document.service");
const profile_module_1 = require("../profile/profile.module");
const mongoose_1 = require("@nestjs/mongoose");
const paper_model_1 = require("./paper-model");
const document_controller_1 = require("./document.controller");
const booking_module_1 = require("../booking/booking.module");
const checklist_service_1 = require("./checklist.service");
const signature_service_1 = require("./signature.service");
const signature_model_1 = require("./signature.model");
const contract_paper_data_povider_1 = require("./generators/contract-paper-data-povider");
const tech_rider_data_provider_1 = require("./generators/tech-rider-data.provider");
const platform_express_1 = require("@nestjs/platform-express");
const uploads_service_1 = require("./uploads.service");
const pdf_module_1 = require("../pdf/pdf.module");
let DocumentModule = class DocumentModule {
};
DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: paper_model_1.Paper.name,
                    schema: paper_model_1.PaperSchema
                }, {
                    name: signature_model_1.Signature.name,
                    schema: signature_model_1.SignatureSchema
                }]),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            profile_module_1.ProfileModule,
            booking_module_1.BookingModule,
            pdf_module_1.PdfModule
        ],
        controllers: [
            document_controller_1.DocumentController
        ],
        providers: [
            document_service_1.DocumentService,
            checklist_service_1.ChecklistService,
            signature_service_1.SignatureService,
            contract_paper_data_povider_1.ContractPaperDataProvider,
            tech_rider_data_provider_1.TechRiderDataProvider,
            uploads_service_1.UploadsService
        ],
    })
], DocumentModule);
exports.DocumentModule = DocumentModule;
//# sourceMappingURL=document.module.js.map