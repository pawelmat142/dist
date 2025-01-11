import { ArtistService } from "../../artist/artist.service";
import { EventService } from "../../event/event.service";
import { FormService } from "../../form/form.service";
import { JwtPayload } from "../../profile/auth/jwt-strategy";
import { ProfileService } from "../../profile/profile.service";
import { TelegramService } from "../../telegram/telegram.service";
import { Booking } from "../model/booking.model";
import { Event } from "../../event/model/event.model";
export interface BookingSubmitCtx {
    booking: Partial<Booking>;
    profile: JwtPayload;
    event?: Event;
}
export declare class SubmitService {
    private readonly artistService;
    private readonly formService;
    private readonly profileService;
    private readonly eventService;
    private readonly telegramService;
    private readonly logger;
    constructor(artistService: ArtistService, formService: FormService, profileService: ProfileService, eventService: EventService, telegramService: TelegramService);
    submitForm(formId: string, profile: JwtPayload, params?: {
        skipValidateDuplicate: boolean;
    }): Promise<BookingSubmitCtx>;
    msgToManagerAboutSubmitedForm(ctx: BookingSubmitCtx): Promise<void>;
}
