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
import { HydratedDocument } from "mongoose";
import { RRule } from "./rrule";
export type GoalDocument = HydratedDocument<Goal>;
export type GoalStatus = 'ACTIVE' | 'INACTIVE';
export type GoalAction = 'CREATE' | 'MARK_READY' | 'UNMARK' | 'EDIT' | 'REMINDER';
export type Priority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export declare class Goal {
    id: string;
    telegramChannelId: string;
    name: string;
    rrule: RRule;
    status: GoalStatus;
    priority: Priority;
    notificationEnabled: boolean;
    history: {
        action: GoalAction;
        date: Date;
        note?: string;
    }[];
    modified?: Date;
    ready?: boolean;
    mark(action?: GoalAction, note?: string): void;
    toMsgWithDaytime(): string;
    get reminder(): boolean;
    nextDate(): Date;
}
export declare const GoalSchema: import("mongoose").Schema<Goal, import("mongoose").Model<Goal, any, any, any, import("mongoose").Document<unknown, any, Goal> & Goal & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Goal, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Goal>> & import("mongoose").FlatRecord<Goal> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
