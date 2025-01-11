import { ArtistViewDto } from "./model/artist-view.dto";
import { Artist } from "./model/artist.model";
export declare abstract class ArtistUtil {
    static isViewReady(artist: ArtistViewDto): boolean;
    private static imagesReadyForView;
    static artistNames(artists: Artist[]): string;
}
