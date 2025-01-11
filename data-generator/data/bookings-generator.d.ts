import { Profile } from "../../profile/model/profile.model";
import { BookingService } from "../../booking/services/booking.service";
import { Booking } from "../../booking/model/booking.model";
import { FormService } from "../../form/form.service";
import { ArtistViewDto } from "../../artist/model/artist-view.dto";
export declare class BookingsGenerator {
    private readonly bookingService;
    private readonly formService;
    private readonly logger;
    constructor(bookingService: BookingService, formService: FormService);
    private PROMOTERS;
    private ARTISTS;
    private BOOKINGS;
    private boookingsIterator;
    _eventNames: string[];
    generate(PROMOTERS: Profile[], ARTISTS: ArtistViewDto[]): Promise<Booking[]>;
    private getneratePromoterZeroBookings;
    private getneratePromoterOneBookings;
    private getRandomEventInfo;
    private generateBooking;
    private _eventNamesIterator;
    private getEventName;
    private promoterInfoFromProfie;
    private getEventInformation;
}
