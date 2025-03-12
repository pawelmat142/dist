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
import { Model } from 'mongoose';
import { Profile } from './profile.model';
export declare class ProfileService {
    private profileModel;
    private readonly logger;
    constructor(profileModel: Model<Profile>);
    findById(uid: string): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findByName(name: string): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findByTelegram(telegramChannelId: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    createProfile(_profile: Partial<Profile>): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteProfile(profile: Profile): Promise<void>;
}
