import { Event } from "../../event/model/event.model";
import { JwtPayload } from "../../profile/auth/jwt-strategy";
import { Booking } from "../model/booking.model";
import { TimelineItem } from "../services/artist-timeline.service";
export declare abstract class BookingUtil {
    static bookingRoles(booking: Booking, profileUid: string): string[];
    static artistSignatures(booking: Booking): string[];
    static addStatusToHistory(booking: Partial<Booking>, profile: JwtPayload): void;
    static depositDeadline(event: Event): Date;
    static feeDeadline(event: Event): Date;
    static timelineItem(booking: Booking): TimelineItem;
}
