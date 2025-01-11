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
import { Profile, RegisterMode } from './model/profile.model';
import { Model } from 'mongoose';
import { JwtPayload } from './auth/jwt-strategy';
import { ArtistForm } from '../artist/artist.controller';
import { AppJwtService } from './auth/app-jwt.service';
import { ManagerData } from './model/profile-interfaces';
export interface Credentials {
    email: string;
    password: string;
}
export declare class ProfileService {
    private profileModel;
    private readonly jwtService;
    private readonly logger;
    constructor(profileModel: Model<Profile>, jwtService: AppJwtService);
    findById(uid: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    findByArtistSignature(artistSignature: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    findTelegramChannedId(uid: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    fetchForJwt(uid: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    updatePromoterInfoWhenSubmitForm(formData: any, profile: JwtPayload): Promise<void>;
    createProfile(_profile: Partial<Profile>, registerMode: RegisterMode): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    fetchManagers(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "find", {}>;
    fetchManagerData(uid: string): Promise<ManagerData>;
    setManagerData(managerData: ManagerData, profile: JwtPayload): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "updateOne", {}>;
    fetchFullProfile(payload: JwtPayload): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    refreshToken(_profile: JwtPayload): Promise<{
        token: string;
    }>;
    updateArtistProfile(form: ArtistForm, _profile: JwtPayload, artistSignature: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
