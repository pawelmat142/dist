import { BookingService } from "./booking.service";
import { JwtPayload } from "../../profile/auth/jwt-strategy";
export declare class BookingDocumentsService {
    private readonly bookingService;
    private readonly logger;
    constructor(bookingService: BookingService);
    requestDocuments(formId: string, profile: JwtPayload): Promise<import("../model/booking.model").Booking>;
}
