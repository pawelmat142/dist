import { Event } from "./model/event.model";
import { Model } from "mongoose";
import { BookingSubmitCtx } from "../booking/services/submit.service";
export declare class EventCreationService {
    private eventModel;
    private readonly logger;
    constructor(eventModel: Model<Event>);
    findEventDuplicateOrCreateNew(ctx: BookingSubmitCtx, params?: {
        skipValidateDuplicate: boolean;
    }): Promise<Event>;
    private createNewEvent;
    private isEventNameDuplicated;
    private levenshtein;
    private processEventDates;
    private processEventName;
    private prepareSignature;
}
