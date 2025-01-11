import { AppJwtService } from "./app-jwt.service";
import { ProfileService } from "../profile.service";
export declare function RoleGuard(role: string): import("@nestjs/common").Type<{
    readonly jwtService: AppJwtService;
    readonly profileService: ProfileService;
    verifyRole(): void;
    readonly loggerName: string;
    logger: import("@nestjs/common").Logger;
    profile?: import("../model/profile.model").Profile;
    canActivate(context: import("@nestjs/common").ExecutionContext): Promise<boolean>;
    logIn<TRequest extends {
        logIn: Function;
    } = any>(request: TRequest): Promise<void>;
    handleRequest<TUser = any>(err: any, user: any, info: any, context: import("@nestjs/common").ExecutionContext, status?: any): TUser;
    getAuthenticateOptions(context: import("@nestjs/common").ExecutionContext): import("@nestjs/passport").IAuthModuleOptions<any>;
    getRequest(context: import("@nestjs/common").ExecutionContext): any;
}>;
