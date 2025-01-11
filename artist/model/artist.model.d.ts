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
import { TimelineItem } from "../../booking/services/artist-timeline.service";
export declare const artistMediaCodes: readonly ["", "facebook", "instagram", "soundcloud", "bandcamp", "spotify", "you_tube", "website"];
export type ArtistMediaCode = typeof artistMediaCodes[number];
export interface Chip {
    name: string;
    id: string;
}
export interface SelectorItem {
    name: string;
    code: string;
    imgUrl?: string;
    svg?: ArtistMediaCode;
}
export interface ArtistStyle extends Chip {
}
export interface ArtistLabel extends Chip {
}
export interface Country extends SelectorItem {
}
export interface ArtistMedia {
    code: string;
    url: string;
}
export interface FireImg {
    firePath: string;
    url: string;
}
export interface FireImgSet {
    name: string;
    bg?: FireImg;
    bgMobile?: FireImg;
    avatar?: FireImg;
    avatarMobile?: FireImg;
    mini?: FireImg;
}
export interface Images {
    avatar?: FireImgSet;
    bg?: FireImgSet[];
}
export type ArtistDocument = HydratedDocument<Artist>;
export type ArtistStatus = 'CREATED' | 'READY' | 'ACTIVE' | 'INACTIVE';
export declare class Artist {
    signature: string;
    managerUid?: string;
    status: ArtistStatus;
    name: string;
    country: Country;
    styles: ArtistStyle[];
    labels: ArtistLabel[];
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    medias?: ArtistMedia[];
    images: Images;
    bio: string;
    managmentNotes: string;
    created: Date;
    modified: Date;
    timeline?: TimelineItem[];
}
export declare const ArtistSchema: import("mongoose").Schema<Artist, import("mongoose").Model<Artist, any, any, any, import("mongoose").Document<unknown, any, Artist> & Artist & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Artist, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Artist>> & import("mongoose").FlatRecord<Artist> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
