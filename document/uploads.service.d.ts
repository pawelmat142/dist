/// <reference types="multer" />
import { Template } from "./paper-util";
import { JwtPayload } from "../profile/auth/jwt-strategy";
import { BookingService } from "../booking/services/booking.service";
import { DocumentService } from "./document.service";
import { Paper } from "./paper-model";
export declare class UploadsService {
    private readonly bookingService;
    private readonly documentService;
    private readonly logger;
    private readonly UPLOAD_EXTENSIONS;
    private readonly UPLOAD_TEMPLATES;
    private readonly MAX_FILE_BYTES;
    constructor(bookingService: BookingService, documentService: DocumentService);
    uploadPaperFile(formId: string, template: Template, profile: JwtPayload, file: Express.Multer.File): Promise<Paper>;
    private validateUploadFile;
    verifyPaperFile(paperId: string, profile: JwtPayload): Promise<void>;
    downloadFile(paperId: string, profile: JwtPayload): Promise<Paper>;
    deletePaper(id: string, profile: JwtPayload): Promise<{
        deleted: boolean;
    }>;
}
