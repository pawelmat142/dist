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
import { ArtistService } from './artist.service';
import { ArtistViewDto } from './model/artist-view.dto';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { ArtistStatus } from './model/artist.model';
import { TimelineItem } from '../booking/services/artist-timeline.service';
import { ArtistManagerService } from './artist-manager.service';
export interface FetchArtistQuery {
    name?: string;
    signature?: string;
}
export interface SelectorItem {
    code: string;
    name: string;
}
export interface ArtistForm {
    manager: SelectorItem;
    artistName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}
export declare class ArtistController {
    private readonly artistService;
    private readonly artistManagerService;
    constructor(artistService: ArtistService, artistManagerService: ArtistManagerService);
    createArtist(artist: ArtistForm, profile: JwtPayload): Promise<ArtistViewDto>;
    fetchArtist(query: FetchArtistQuery): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./model/artist.model").Artist, "findOne", {}>;
    fetchArtists(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./model/artist.model").Artist, "find", {}>;
    updateArtistView(artist: ArtistViewDto, profile: JwtPayload): Promise<import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & ArtistViewDto>;
    listMusicStyles(): Promise<import("./model/artist.model").ArtistStyle[]>;
    listArtistLabels(): Promise<import("./model/artist.model").ArtistLabel[]>;
    fetchArtistsOfManager(profile: JwtPayload): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./model/artist.model").Artist> & import("./model/artist.model").Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./model/artist.model").Artist, "find", {}>;
    putManagementNotes(body: {
        managmentNotes: string;
        artistSignture: string;
    }, profile: JwtPayload): Promise<void>;
    setStatus(status: ArtistStatus, signature: string, profile: JwtPayload): Promise<void>;
    getTimeline(artistSignature: string): Promise<{
        timeline: TimelineItem[];
    }>;
    submitTimelineEvent(artistSignature: string, body: TimelineItem, profile: JwtPayload): Promise<TimelineItem[]>;
    removeTimelineEvent(artistSignature: string, id: string, profile: JwtPayload): void;
}
