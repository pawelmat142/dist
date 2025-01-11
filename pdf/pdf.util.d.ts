import { PaperGenerateParameters } from "../document/paper-util";
import { PdfTemplate } from "./model/pdf-data";
import { PdfData } from "./model/pdf-data.model";
export declare abstract class PdfUtil {
    static prepareDefaultPdfData(template: PdfTemplate): PdfData;
    static preparePaperGenerateParams(data?: any): PaperGenerateParameters;
}
