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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { LoginToken, ProfileTelegramService } from './profile-telegram.service';
import { LoginForm, ProfileEmailService } from './profile-email.service';
import { ProfileService } from './profile.service';
import { JwtPayload } from './auth/jwt-strategy';
import { Profile } from './model/profile.model';
import { ManagerData } from './model/profile-interfaces';
export declare class ProfileController {
    private readonly profileTelegramService;
    private readonly profileEmailService;
    private readonly profileService;
    constructor(profileTelegramService: ProfileTelegramService, profileEmailService: ProfileEmailService, profileService: ProfileService);
    fetchFullProfile(payload: JwtPayload): import("mongoose").Query<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "findOne", {}>;
    fetchManagers(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "find", {}>;
    fetchManagerData(profile: JwtPayload): Promise<ManagerData>;
    setManagerData(body: ManagerData, profile: JwtPayload): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Profile, "updateOne", {}>;
    fetchTelegramBotHref(): {
        url: string;
    };
    telegramPinRequest(uidOrNameOrEmail: string): Promise<{
        token: string;
    }>;
    loginByPin(body: Partial<LoginToken>): Promise<{
        token: string;
    }>;
    refreshToken(profile: JwtPayload): Promise<{
        token: string;
    }>;
    createProfileEmail(body: LoginForm): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    loginByEmail(body: Partial<LoginForm>): Promise<{
        token: string;
    }>;
}
