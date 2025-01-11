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
import { Model } from 'mongoose';
import { ArtistService } from '../../artist/artist.service';
import { EventService } from '../../event/event.service';
import { JwtPayload } from '../../profile/auth/jwt-strategy';
import { BookingDto } from '../model/booking.dto';
import { Booking } from '../model/booking.model';
import { SubmitService } from './submit.service';
import { ProfileService } from '../../profile/profile.service';
import { TelegramService } from '../../telegram/telegram.service';
import { BookingContext, SimpleBookingContext } from '../model/interfaces';
export declare class BookingService {
    private bookingModel;
    private readonly submitService;
    private readonly artistService;
    private readonly eventService;
    private readonly profileService;
    private readonly telegramService;
    private readonly logger;
    constructor(bookingModel: Model<Booking>, submitService: SubmitService, artistService: ArtistService, eventService: EventService, profileService: ProfileService, telegramService: TelegramService);
    submitForm(formId: string, profile: JwtPayload, params?: {
        skipValidateDuplicate: boolean;
    }): Promise<import("mongoose").Document<unknown, {}, Booking> & Booking & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    private validateBookingDuplicate;
    fetchProfileBookings(profile: JwtPayload): Promise<BookingDto[]>;
    private profileBookingFilter;
    panelArtistBookings(artistSignature: string, profile: JwtPayload): Promise<BookingDto[]>;
    fetchFullBooking(formId: string, profile: JwtPayload): Promise<BookingDto>;
    private bookingDtoFromBooking;
    buildSimpleContext(formId: string, profile: JwtPayload): Promise<SimpleBookingContext>;
    buildContext(formId: string, profile: JwtPayload): Promise<BookingContext>;
    fetchFormData(formId: string, profile: JwtPayload): Promise<any>;
    fetchBooking(formId: string, profile: JwtPayload): Promise<Booking>;
    update(booking: Booking): Promise<void>;
    findPromoterInfo(uid: string): Promise<any>;
    msgToPromoterOrManager(ctx: BookingContext, msg: string[]): Promise<void>;
    hasPermissionToBooking(formId: string, uid: string): Promise<boolean>;
}
