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
import { ManagerData } from "./profile-interfaces";
export type ProfileDocument = HydratedDocument<Profile>;
export type RegisterMode = 'TELEGRAM' | 'EMAIL';
export declare class Profile {
    uid: string;
    name: string;
    roles: string[];
    artistSignature?: string;
    registerMode: RegisterMode;
    telegramChannelId?: string;
    phoneNumber?: string;
    contactEmail?: string;
    email?: string;
    passwordHash?: string;
    firstName?: string;
    lastName?: string;
    created: Date;
    modified: Date;
    managerData?: ManagerData;
    promoterInfo?: any;
}
export declare const ProfileSchema: import("mongoose").Schema<Profile, import("mongoose").Model<Profile, any, any, any, import("mongoose").Document<unknown, any, Profile> & Profile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Profile, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Profile>> & import("mongoose").FlatRecord<Profile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;