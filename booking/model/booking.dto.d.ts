import { BookingStatus, StatusHistory } from "./booking.model";
import { SelectorItem } from "../../artist/model/artist.model";
import { Event } from "../../event/model/event.model";
import { ChecklistItem } from "./checklist.interface";
export declare class BookingDto {
    formId: string;
    promoterUid: string;
    managerUid: string;
    status: BookingStatus;
    artists: SelectorItem[];
    eventSignature: string;
    statusHistory: StatusHistory[];
    event?: Event;
    checklist: ChecklistItem[];
}
