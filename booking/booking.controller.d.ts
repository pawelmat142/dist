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
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { BookingDto } from './model/booking.dto';
import { BookingService } from './services/booking.service';
import { BookingCancelService } from './services/booking-cancel.service';
import { BookingDocumentsService } from './services/booking-documents.service';
import { ArtistTimelineService } from './services/artist-timeline.service';
export declare class BookingController {
    private readonly bookingService;
    private readonly bookingCancelService;
    private readonly bookingDocumentsService;
    private readonly artistTimelineService;
    constructor(bookingService: BookingService, bookingCancelService: BookingCancelService, bookingDocumentsService: BookingDocumentsService, artistTimelineService: ArtistTimelineService);
    submitForm(formId: string, profile: JwtPayload): Promise<import("mongoose").Document<unknown, {}, import("./model/booking.model").Booking> & import("./model/booking.model").Booking & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    fetchProfileBookings(profile: JwtPayload): Promise<BookingDto[]>;
    fetchFormData(formId: string, profile: JwtPayload): Promise<any>;
    findPromoterInfo(profile?: JwtPayload): Promise<any>;
    cancelBooking(formId: string, profile: JwtPayload): Promise<import("./model/booking.model").Booking>;
    requestDocuments(formId: string, profile: JwtPayload): Promise<import("./model/booking.model").Booking>;
    artistTimeline(artistSignature: string): Promise<import("./services/artist-timeline.service").TimelineItem[]>;
    panelArtistBookings(artistSignature: string, profile: JwtPayload): Promise<BookingDto[]>;
    fetchFullBooking(formId: string, profile: JwtPayload): Promise<BookingDto>;
}
