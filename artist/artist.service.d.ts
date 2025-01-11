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
import { Artist, ArtistLabel, ArtistStyle } from './model/artist.model';
import { Model } from 'mongoose';
import { ArtistViewDto } from './model/artist-view.dto';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { ArtistForm, FetchArtistQuery } from './artist.controller';
import { ProfileService } from '../profile/profile.service';
import { TelegramService } from '../telegram/telegram.service';
import { BookingSubmitCtx } from '../booking/services/submit.service';
import { TimelineItem } from '../booking/services/artist-timeline.service';
export declare class ArtistService {
    private artistModel;
    private readonly profileService;
    private readonly telegramService;
    private readonly logger;
    constructor(artistModel: Model<Artist>, profileService: ProfileService, telegramService: TelegramService);
    private readonly PUBLIC_VIEW_ARTIST_STATUSES;
    createArtist(form: ArtistForm, profile: JwtPayload): Promise<ArtistViewDto>;
    fetchArtist(query: FetchArtistQuery): import("mongoose").Query<import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Artist, "findOne", {}>;
    getArtist(signature: string): Promise<import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getArtists(signatures: string[]): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Artist, "find", {}>;
    fetchArtists(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Artist, "find", {}>;
    listNamesBySignatures(signatures: string[]): Promise<string[]>;
    updateArtistView(artist: ArtistViewDto, profile: JwtPayload): Promise<import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & ArtistViewDto>;
    private msgToManager;
    private prepareArtistSignature;
    processBookingForm(ctx: BookingSubmitCtx): Promise<void>;
    listMusicStyles(): Promise<ArtistStyle[]>;
    listArtistLabels(): Promise<ArtistLabel[]>;
    getTimeline(artistSignature: string): Promise<{
        timeline: TimelineItem[];
    }>;
}
