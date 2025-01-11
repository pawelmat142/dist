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
import { Artist, ArtistStatus } from './model/artist.model';
import { Model } from 'mongoose';
import { JwtPayload } from '../profile/auth/jwt-strategy';
import { TimelineItem } from '../booking/services/artist-timeline.service';
export declare class ArtistManagerService {
    private artistModel;
    private readonly logger;
    constructor(artistModel: Model<Artist>);
    fetchArtistsOfManager(profile: JwtPayload): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Artist> & Artist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Artist, "find", {}>;
    putManagementNotes(body: {
        managmentNotes: string;
        artistSignture: string;
    }, profile: JwtPayload): Promise<void>;
    setStatus(status: ArtistStatus, signature: string, profile: JwtPayload): Promise<void>;
    submitTimelineEvent(artistSignature: string, event: TimelineItem, profile: JwtPayload): Promise<TimelineItem[]>;
    removeTimelineEvent(artistSignature: string, id: string, profile: JwtPayload): Promise<TimelineItem[]>;
    private manageFilter;
}
