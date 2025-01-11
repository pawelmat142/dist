import { ArtistLabel, ArtistMedia, ArtistStatus, ArtistStyle, Country, Images } from "./artist.model";
import { TimelineItem } from "../../booking/services/artist-timeline.service";
export declare class ArtistViewDto {
    status: ArtistStatus;
    signature: string;
    name: string;
    country: Country;
    styles: ArtistStyle[];
    labels: ArtistLabel[];
    medias?: ArtistMedia[];
    images: Images;
    bio: string;
    managmentNotes: string;
    timeline?: TimelineItem[];
}
