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
import { Size } from "../profile/model/profile-interfaces";
import { Status } from "../global/status";
export type SignatureDocument = HydratedDocument<Signature>;
export type SignatureStatus = Status.DRAFT | Status.READY | Status.CANCELED | Status.USED;
export interface PutSignatureDto {
    base64data: string;
    size: Size;
    id?: string;
}
export declare class Signature {
    id: string;
    uid: string;
    status: SignatureStatus;
    created: Date;
    modified?: Date;
    base64data: string;
    size: Size;
}
export declare const SignatureSchema: import("mongoose").Schema<Signature, import("mongoose").Model<Signature, any, any, any, import("mongoose").Document<unknown, any, Signature> & Signature & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Signature, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Signature>> & import("mongoose").FlatRecord<Signature> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
