/// <reference types="node" />
import { PdfTemplate } from "../pdf/model/pdf-data";
import { ManagerData } from "../profile/model/profile-interfaces";
import { Paper, PaperSignature, PaperStatus } from "./paper-model";
import { Response } from 'express';
export type Template = PdfTemplate | 'rental-proof';
export interface PaperGenerateParameters {
    headerTemplate?: string;
    footerTemplate?: string;
    displayHeaderFooter?: boolean;
}
export declare abstract class PaperUtil {
    static agencyString(managerData: ManagerData): string;
    static getContentType(filename: string): string;
    static addSignaturesData(data: any, paperSignatures: PaperSignature[]): void;
    static fileResponse(res: Response, buffer: Buffer, filename: string): void;
    static resolvePaperStatus(paper: Paper): PaperStatus;
}
