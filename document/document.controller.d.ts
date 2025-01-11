/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Paper } from './paper-model';
import { DocumentService } from './document.service';
import { Response } from 'express';
import { Template } from './paper-util';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { ChecklistService } from './checklist.service';
import { PutSignatureDto, Signature } from './signature.model';
import { SignatureService } from './signature.service';
import { UploadsService } from './uploads.service';
import { PdfTemplate } from '../pdf/model/pdf-data';
export declare class DocumentController {
    private readonly documentService;
    private readonly checklistService;
    private readonly signatureService;
    private readonly uploadsService;
    constructor(documentService: DocumentService, checklistService: ChecklistService, signatureService: SignatureService, uploadsService: UploadsService);
    refreshChecklist(formId: string, profile: JwtPayload): Promise<import("../booking/model/checklist.interface").ChecklistItem[]>;
    downloadPaper(res: Response, id: string, profile: JwtPayload): Promise<void>;
    generate(res: Response, formId: string, template: PdfTemplate, profile: JwtPayload): Promise<void>;
    signPaper(res: Response, paperId: string, signatureId: string, profile: JwtPayload): Promise<void>;
    downloadSignedPaper(res: Response, id: string, profile: JwtPayload): Promise<void>;
    deletePaper(id: string, profile: JwtPayload): Promise<{
        deleted: boolean;
    }>;
    uploadFile(formId: string, template: Template, profile: JwtPayload, file: Express.Multer.File): Promise<Paper>;
    verifyPaperFile(paperId: string, profile: JwtPayload): void;
    downloadFile(paperId: string, res: Response, profile: JwtPayload): Promise<void>;
    listSignatures(profile: JwtPayload): Promise<(import("mongoose").Document<unknown, {}, Signature> & Signature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    putSignature(dto: PutSignatureDto, profile: JwtPayload): Promise<{
        id: string;
    }>;
    cancelSignature(id: string, profile: JwtPayload): Promise<void>;
}
