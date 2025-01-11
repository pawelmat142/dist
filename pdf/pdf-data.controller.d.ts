import { PdfDataService } from './pdf-data.service';
import { PdfDataDto, PdfTemplate } from './model/pdf-data';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { Response } from 'express';
export declare class PdfDataController {
    private readonly pdfDataService;
    constructor(pdfDataService: PdfDataService);
    getDefaultPdfData(template: PdfTemplate): import("./model/pdf-data.model").PdfData;
    list(artistSignature: string, profile: JwtPayload): Promise<import("./model/pdf-data.model").PdfData[]>;
    getByName(name: string, artistSignature: string, profile: JwtPayload): Promise<import("./model/pdf-data.model").PdfData>;
    save(artistSignature: string, dto: PdfDataDto, profile: JwtPayload): Promise<import("./model/pdf-data.model").PdfData>;
    delete(id: string, profile: JwtPayload): Promise<void>;
    activate(id: string, template: PdfTemplate, profile: JwtPayload): Promise<void>;
    deactivate(id: string, template: PdfTemplate, profile: JwtPayload): Promise<void>;
    generatePreview(res: Response, id: string, profile: JwtPayload): Promise<void>;
    generatePreviewDefault(res: Response, template: PdfTemplate): Promise<void>;
}
