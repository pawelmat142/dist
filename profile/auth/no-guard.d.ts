import { ExecutionContext } from "@nestjs/common";
import { Profile } from "../model/profile.model";
import { ProfileService } from "../profile.service";
import { AppJwtService } from "./app-jwt.service";
declare const NoGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class NoGuard extends NoGuard_base {
    protected readonly jwtService: AppJwtService;
    protected readonly profileService: ProfileService;
    constructor(jwtService: AppJwtService, profileService: ProfileService);
    profile?: Profile;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
