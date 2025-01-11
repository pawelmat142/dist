import { ArtistService } from "../../artist/artist.service";
import { Booking, BookingStatus } from "../model/booking.model";
import { Model } from 'mongoose';
import { SelectorItem } from "../../artist/artist.controller";
export interface EventInformation {
    performanceStartDate: Date;
    performanceEndDate?: Date;
    eventName?: string;
    eventCountry?: SelectorItem;
    venueCapacity?: number;
}
export interface TimelineItem {
    id: string;
    uid?: string;
    status: BookingStatus;
    eventSignature: string;
    startDate: Date;
    endDate?: Date;
    countryCode?: string;
    header: string;
    subheader?: string;
    txt?: string;
    formData: {
        eventInformation: EventInformation;
    };
}
export declare class ArtistTimelineService {
    private bookingModel;
    private readonly artistService;
    private readonly logger;
    constructor(bookingModel: Model<Booking>, artistService: ArtistService);
    getTimeline(artistSignature: string): Promise<TimelineItem[]>;
    private getArtistBookings;
}
