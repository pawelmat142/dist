import { Country } from "../artist/model/artist.model";
import { JwtPayload } from "../profile/auth/jwt-strategy";
import { Profile } from "../profile/model/profile.model";
export declare abstract class Gen {
    static readonly PHONE_NUMBER = "+48 600 123 456";
    static dotCom(name: string): string;
    static toJwtProfile(profile: Profile): JwtPayload;
    static randomCountry(): Country;
    static getRandomParagraphs(paragraphs?: number): string[];
    private static readonly paragraphs;
}
