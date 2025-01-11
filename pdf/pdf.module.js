"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfModule = void 0;
const common_1 = require("@nestjs/common");
const pdf_generator_service_1 = require("./pdf-generator.service");
const pdf_data_controller_1 = require("./pdf-data.controller");
const pdf_data_service_1 = require("./pdf-data.service");
const mongoose_1 = require("@nestjs/mongoose");
const pdf_data_model_1 = require("./model/pdf-data.model");
const profile_module_1 = require("../profile/profile.module");
let PdfModule = class PdfModule {
};
PdfModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: pdf_data_model_1.PdfData.name,
                    schema: pdf_data_model_1.PdfDataSchema
                }]),
            profile_module_1.ProfileModule
        ],
        providers: [pdf_generator_service_1.PdfGeneratorService, pdf_data_service_1.PdfDataService],
        exports: [pdf_generator_service_1.PdfGeneratorService, pdf_data_service_1.PdfDataService],
        controllers: [pdf_data_controller_1.PdfDataController]
    })
], PdfModule);
exports.PdfModule = PdfModule;
//# sourceMappingURL=pdf.module.js.map