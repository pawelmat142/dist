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
import { PutSignatureDto, Signature } from "./signature.model";
import { Model } from "mongoose";
import { JwtPayload } from "../profile/auth/jwt-strategy";
export declare class SignatureService {
    private signatureModel;
    private readonly logger;
    constructor(signatureModel: Model<Signature>);
    listSignatures(uid: string): Promise<(import("mongoose").Document<unknown, {}, Signature> & Signature & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    putSignature(dto: PutSignatureDto, profile: JwtPayload): Promise<{
        id: string;
    } | undefined>;
    cancelSignature(id: string, uid: string): Promise<void>;
    private createSignature;
    fetch(id: string, uid: string): Promise<Signature>;
}
