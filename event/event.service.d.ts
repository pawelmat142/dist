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
import { Event } from './model/event.model';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { EventCreationService } from './event.duplicate.service';
import { BookingSubmitCtx } from '../booking/services/submit.service';
export declare class EventService {
    private eventModel;
    private readonly eventCreationService;
    private readonly logger;
    constructor(eventModel: Model<Event>, eventCreationService: EventCreationService);
    fetchPromoterEvents(profile: JwtPayload): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Event, "find", {}>;
    fetchEvent(signature: string): Promise<import("mongoose").FlattenMaps<{
        signature: string;
        promoterUid: string;
        status: import("./model/event.model").EventStatus;
        name: string;
        startDate: Date;
        endDate?: Date;
        formData: any;
        created: Date;
        modified: Date;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    eventDataForBookingsList(signature: string): Promise<import("mongoose").Document<unknown, {}, Event> & Event & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    processBookingForm(ctx: BookingSubmitCtx, params?: {
        skipValidateDuplicate: boolean;
    }): Promise<void>;
}
