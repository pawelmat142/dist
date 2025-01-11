import { JwtPayload } from "../../profile/auth/jwt-strategy";
import { BookingService } from "./booking.service";
export declare class BookingCancelService {
    private readonly bookingService;
    private readonly logger;
    constructor(bookingService: BookingService);
    cancelBooking(formId: string, profile: JwtPayload): Promise<import("../model/booking.model").Booking>;
}
