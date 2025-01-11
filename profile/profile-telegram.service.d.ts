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
import { Profile } from './model/profile.model';
import { Model } from 'mongoose';
import { AppJwtService } from './auth/app-jwt.service';
import { ProfileService } from './profile.service';
export interface LoginToken {
    telegramChannelId: string;
    token: string;
    expiration: Date;
    pin: string;
}
export interface TelegramMessage {
    message: string;
    telegramChannelId: string;
}
export declare class ProfileTelegramService {
    private profileModel;
    private readonly jwtService;
    private readonly profileService;
    private readonly logger;
    constructor(profileModel: Model<Profile>, jwtService: AppJwtService, profileService: ProfileService);
    private sendMessageSubject$;
    get sendMessageObs$(): import("rxjs").Observable<TelegramMessage>;
    private cleanMessagesSubject$;
    get cleanMessages$(): import("rxjs").Observable<string>;
    sendMessage(msg: TelegramMessage): void;
    private loginTokens;
    findByTelegram(telegramChannelId: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    findByName(name: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    telegramPinRequest(uidOrNameOrEmail: string): Promise<{
        token: string;
    }>;
    loginByPin(input: Partial<LoginToken>): Promise<{
        token: string;
    }>;
    generateLoginToken(telegramChannelId: string): Promise<LoginToken>;
    createProfile(profile: Partial<Profile>): Promise<void>;
    deleteByTelegram(profile: Profile): Promise<void>;
}
