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
import { AppJwtService } from "./auth/app-jwt.service";
import { Profile } from "./model/profile.model";
import { Model } from "mongoose";
import { ProfileService } from "./profile.service";
import { SelectorItem } from "../artist/artist.controller";
export interface LoginForm {
    name: string;
    role: SelectorItem;
    email: string;
    password: string;
}
export declare class ProfileEmailService {
    private profileModel;
    private readonly jwtService;
    private readonly profileService;
    private readonly logger;
    private readonly HASH_CONSTANT;
    constructor(profileModel: Model<Profile>, jwtService: AppJwtService, profileService: ProfileService);
    createProfile(form: LoginForm): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    loginByEmail(form: Partial<LoginForm>): Promise<{
        token: string;
    }>;
    private emailUid;
}
