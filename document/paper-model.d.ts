/// <reference types="node" />
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
import { Template } from "./paper-util";
import { Role } from "../profile/model/role";
export type PaperDocument = HydratedDocument<Paper>;
export type PaperStatus = 'GENERATED' | 'SIGNED' | 'VERIFIED' | 'ERROR' | 'UPLOADED';
export interface PaperSignature {
    role: Role;
    base64: string;
}
export declare class Paper {
    id: string;
    formId: string;
    template: Template;
    content?: Buffer;
    contentWithSignatures?: Buffer;
    extension: string;
    uid: string;
    generationTime: Date;
    status: PaperStatus;
    signatures?: PaperSignature[];
}
export declare const PaperSchema: import("mongoose").Schema<Paper, import("mongoose").Model<Paper, any, any, any, import("mongoose").Document<unknown, any, Paper> & Paper & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Paper, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Paper>> & import("mongoose").FlatRecord<Paper> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
