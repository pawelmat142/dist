"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfUtil = void 0;
const default_contract_pdf_1 = require("./model/default-contract.pdf");
const default_tech_rider_pdf_1 = require("./model/default-tech-rider.pdf");
class PdfUtil {
    static prepareDefaultPdfData(template) {
        if (template === 'contract') {
            return default_contract_pdf_1.defaultContractPdf;
        }
        if (template === 'tech-rider') {
            return default_tech_rider_pdf_1.defaultTechRiderPdf;
        }
        throw new Error(`Not found template: ${template}`);
    }
    static preparePaperGenerateParams(data) {
        const result = {};
        if (!data) {
            return result;
        }
        const promoterSignature = data.promoterSignature;
        const managerSignature = data.managerSignature;
        if (promoterSignature || managerSignature) {
            result.displayHeaderFooter = true;
            result.headerTemplate = `<span style="display:none"></span>`;
            result.footerTemplate = `<div style="width: 100%; display: flex; justify-content: space-between; padding: 0 20mm;">`;
            result.footerTemplate += managerSignature ? `<img src="${managerSignature}" style="width: 150px;"/>` : '<div></div>';
            result.footerTemplate += promoterSignature ? `<img src="${promoterSignature}" style="width: 150px;"/>` : '<div></div>';
            result.footerTemplate += `</div>`;
        }
        return result;
    }
}
exports.PdfUtil = PdfUtil;
//# sourceMappingURL=pdf.util.js.map