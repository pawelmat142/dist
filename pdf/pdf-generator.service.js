"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const Handlebars = require("handlebars");
const default_contract_pdf_1 = require("./model/default-contract.pdf");
const pdf_util_1 = require("./pdf.util");
let PdfGeneratorService = class PdfGeneratorService {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
    }
    onModuleInit() {
        this.registerCompiler();
    }
    async test() {
        const pdfData = default_contract_pdf_1.defaultContractPdf;
        const plainTemplate = this.preparePlainTemplate(pdfData);
        const html = this.filTemplateWithData(plainTemplate, pdfData);
        return this._generate(html);
    }
    async generate(template, pdfData, data) {
        this.logger.log(`Generate PDF ${template}`);
        const _pdfData = this.preparePdfData(template, pdfData);
        const plainTemplate = this.preparePlainTemplate(_pdfData);
        const html = this.filTemplateWithData(plainTemplate, { data: data });
        const params = pdf_util_1.PdfUtil.preparePaperGenerateParams(data);
        return this._generate(html, params);
    }
    preparePdfData(template, pdfData) {
        return pdfData !== null && pdfData !== void 0 ? pdfData : pdf_util_1.PdfUtil.prepareDefaultPdfData(template);
    }
    async _generate(html, params) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await this.addCssStyles(page);
        const pdfBuffer = await page.pdf({
            format: 'A4',
            displayHeaderFooter: !!(params === null || params === void 0 ? void 0 : params.displayHeaderFooter),
            headerTemplate: (params === null || params === void 0 ? void 0 : params.displayHeaderFooter) ? params.headerTemplate : undefined,
            footerTemplate: (params === null || params === void 0 ? void 0 : params.displayHeaderFooter) ? params.footerTemplate : undefined,
            printBackground: false,
        });
        await browser.close();
        return Buffer.from(pdfBuffer);
    }
    preparePlainTemplate(data) {
        const filePath = this.templateDirPath(`template.hbs`);
        const plainTemplate = fs.readFileSync(filePath, 'utf-8');
        return this.filTemplateWithData(plainTemplate, data);
    }
    filTemplateWithData(template, data) {
        const templateToFill = Handlebars.compile(template);
        return templateToFill(data);
    }
    registerCompiler() {
        Handlebars.registerHelper('compile', function (template, options) {
            const compiledTemplate = Handlebars.compile(template);
            return compiledTemplate(options.data.root);
        });
        this.logger.log(`Handlebar compiler registered`);
    }
    async addCssStyles(puppeteerPage) {
        const cssPath = this.templateDirPath('pdf-styles.css');
        await puppeteerPage.addStyleTag({ path: cssPath });
    }
    templateDirPath(filename) {
        return path.join(__dirname, 'templates', filename);
    }
};
PdfGeneratorService = __decorate([
    (0, common_1.Injectable)()
], PdfGeneratorService);
exports.PdfGeneratorService = PdfGeneratorService;
//# sourceMappingURL=pdf-generator.service.js.map