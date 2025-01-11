import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-strategy";
import { Profile } from "../model/profile.model";
export declare class AppJwtService extends JwtService {
    private readonly SECRET;
    signIn(profile: Profile): string;
    newToken(payload: JwtPayload): string;
    extractToken(request: any): string;
    getPayload(token: string): JwtPayload;
    isExpired(payload: JwtPayload): boolean;
    createPayload(profile: Profile): JwtPayload;
    private getExpirationTimestamp;
}
