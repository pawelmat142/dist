export interface DatePeriod {
    startDate: Date;
    endDate?: Date;
}
export declare abstract class BookingFormProcessor {
    static findEventInformation(bookingFormData: any): any;
    static findEventDates(bookingFormData: any): DatePeriod;
    static findEventName(bookingFormData: any): string;
    static findArtistInformation(bookingFormData: any): any;
}
