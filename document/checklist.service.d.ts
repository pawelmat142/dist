import { BookingService } from "../booking/services/booking.service";
import { JwtPayload } from "../profile/auth/jwt-strategy";
import { DocumentService } from "./document.service";
import { ChecklistItem } from "../booking/model/checklist.interface";
export declare class ChecklistService {
    private readonly bookingService;
    private readonly documentService;
    private readonly logger;
    constructor(bookingService: BookingService, documentService: DocumentService);
    refreshChecklist(formId: string, profile: JwtPayload): Promise<ChecklistItem[]>;
    private checklistReady;
    private lastStep;
    private markStep;
    private updateStep;
}
