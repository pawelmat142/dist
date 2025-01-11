import { EventStatus } from "./event.model";
export declare class EventPanelDto {
    signature: string;
    promoterUid: string;
    status: EventStatus;
    name: string;
    startDate: Date;
    endDate?: Date;
}
