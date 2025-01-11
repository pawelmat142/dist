import { ExecutionContext, Logger } from "@nestjs/common";
import { Profile } from "../model/profile.model";
import { ProfileService } from "../profile.service";
import { AppJwtService } from "./app-jwt.service";
declare const JwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtGuard extends JwtGuard_base {
    protected readonly jwtService: AppJwtService;
    protected readonly profileService: ProfileService;
    get loggerName(): string;
    logger: Logger;
    constructor(jwtService: AppJwtService, profileService: ProfileService);
    profile?: Profile;
    canActivate(context: ExecutionContext): Promise<boolean>;
    protected verifyRole(): void;
}
export {};
