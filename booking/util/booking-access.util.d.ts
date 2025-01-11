import { JwtPayload } from "../../profile/auth/jwt-strategy";
import { Booking } from "../model/booking.model";
export declare abstract class BookingAccessUtil {
    static canCancelBooking(booking: Booking, profile: JwtPayload): boolean;
    static canRequestBookingDocuments(booking: Booking, profile: JwtPayload): boolean;
}
