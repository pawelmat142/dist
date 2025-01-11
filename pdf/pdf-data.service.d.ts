/// <reference types="node" />
import { PdfDataDto, PdfTemplate } from './model/pdf-data';
import { PdfData, PdfDataDocument } from './model/pdf-data.model';
import { Model, RootFilterQuery } from 'mongoose';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { PdfGeneratorService } from './pdf-generator.service';
export declare class PdfDataService {
    private pdfDataModel;
    private readonly pdfGeneratorService;
    private readonly logger;
    constructor(pdfDataModel: Model<PdfData>, pdfGeneratorService: PdfGeneratorService);
    find(filter: RootFilterQuery<PdfData>): Promise<PdfDataDocument>;
    getDefaultPdfData(tempalte: PdfTemplate): PdfData;
    list(artistSignature: string, managerUid: string): Promise<PdfData[]>;
    getByName(name: string, artistSignature: string, managerUid: string): Promise<PdfData>;
    save(artistSignature: string, dto: PdfDataDto, profile: JwtPayload): Promise<PdfData>;
    delete(id: string, profile: JwtPayload): Promise<void>;
    activate(id: string, profile: JwtPayload, template: PdfTemplate): Promise<void>;
    deactivate(id: string, profile: JwtPayload, template: PdfTemplate): Promise<void>;
    private update;
    private create;
    getById(id: string, managerUid: string): Promise<PdfData>;
    get(name: string, artistSignature: string, managerUid: string): Promise<PdfData>;
    generatePreview(id: string, profile: JwtPayload): Promise<Buffer>;
    generatePreviewDefault(template: PdfTemplate): Promise<Buffer>;
}
