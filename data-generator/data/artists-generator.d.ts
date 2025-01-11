import { ArtistService } from "../../artist/artist.service";
import { ProfileEmailService } from "../../profile/profile-email.service";
import { ArtistViewDto } from "../../artist/model/artist-view.dto";
import { Profile } from "../../profile/model/profile.model";
import { ArtistManagerService } from "../../artist/artist-manager.service";
export declare class ArtistsGenerator {
    private readonly profileEmailService;
    private readonly artistService;
    private readonly artistManagerService;
    private readonly logger;
    constructor(profileEmailService: ProfileEmailService, artistService: ArtistService, artistManagerService: ArtistManagerService);
    private ARTISTS;
    private MANAGER;
    readonly ARTIST_EMAIL = "artist@test";
    ARTIST_SIGNATURE: string;
    generateArtistss(manager: Profile): Promise<ArtistViewDto[]>;
    private generateArtists;
    private generateArtist;
    private getArtistBio;
    private getArtistManagementNotes;
}
