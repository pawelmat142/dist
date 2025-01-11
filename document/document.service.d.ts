/// <reference types="node" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Template } from './paper-util';
import { Paper } from './paper-model';
import { Model } from 'mongoose';
import { BookingContext, SimpleBookingContext } from '../booking/model/interfaces';
import { BookingService } from '../booking/services/booking.service';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { PdfTemplate } from '../pdf/model/pdf-data';
import { ContractPaperDataProvider } from './generators/contract-paper-data-povider';
import { TechRiderDataProvider } from './generators/tech-rider-data.provider';
import { PdfGeneratorService } from '../pdf/pdf-generator.service';
import { SignatureService } from './signature.service';
import { PdfDataService } from '../pdf/pdf-data.service';
export declare class DocumentService {
    private paperModel;
    private readonly bookingService;
    private readonly contractPaperDataProvider;
    private readonly techRiderDataProvider;
    private readonly pdfGeneratorService;
    private readonly pdfDataService;
    private readonly signatureService;
    private readonly logger;
    constructor(paperModel: Model<Paper>, bookingService: BookingService, contractPaperDataProvider: ContractPaperDataProvider, techRiderDataProvider: TechRiderDataProvider, pdfGeneratorService: PdfGeneratorService, pdfDataService: PdfDataService, signatureService: SignatureService);
    fetchBookingPapers(formId: string): Promise<(import("mongoose").Document<unknown, {}, Paper> & Paper & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    fetchPaper(id: string): Promise<import("mongoose").Document<unknown, {}, Paper> & Paper & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPaper(id: string): Promise<import("mongoose").Document<unknown, {}, Paper> & Paper & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    storeBookingPaper(buffer: Buffer, ctx: BookingContext, template: Template): Promise<Paper>;
    storeUploadPaper(buffer: Buffer, ctx: SimpleBookingContext, template: Template, extension: string): Promise<import("mongoose").Document<unknown, {}, Paper> & Paper & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updatePaper(paper: Paper): Promise<Paper>;
    downloadPaper(id: string, profile: JwtPayload): Promise<import("mongoose").Document<unknown, {}, Paper> & Paper & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deletePaperItem(id: string): Promise<any>;
    downloadSignedPaper(id: string, profile: JwtPayload): Promise<Paper>;
    generatePdf(formId: string, template: PdfTemplate, profile: JwtPayload): Promise<Paper>;
    private getActivePdfDataForArtistAndManager;
    generateSignedPaper(paperId: string, signatureId: string, profile: JwtPayload): Promise<Paper>;
    private prepareData;
    private updatePaperSignatures;
}
