"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const profile_service_1 = require("../profile.service");
const app_jwt_service_1 = require("./app-jwt.service");
const role_1 = require("../model/role");
let JwtGuard = JwtGuard_1 = class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    get loggerName() {
        return JwtGuard_1.name;
    }
    constructor(jwtService, profileService) {
        super();
        this.jwtService = jwtService;
        this.profileService = profileService;
        this.logger = new common_1.Logger(this.loggerName);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        this.profile = undefined;
        try {
            const token = this.jwtService.extractToken(request);
            if (!token) {
                throw new common_1.ForbiddenException(`Not found token`);
            }
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token, { secret });
            if (!payload) {
                throw new common_1.ForbiddenException(`Not found payload`);
            }
            if (!payload.uid) {
                throw new common_1.ForbiddenException(`Not found uid`);
            }
            this.profile = await this.profileService.fetchForJwt(payload.uid);
            if (this.profile.roles.includes(role_1.Role.ADMIN)) {
                this.logger.log(`ADMIN role access`);
                return true;
            }
            this.verifyRole();
            const tokenExpider = this.jwtService.isExpired(payload);
            if (tokenExpider) {
                throw new common_1.UnauthorizedException(`Token expired`);
            }
            const newToken = this.jwtService.newToken(payload);
            response.header('Authorization', 'Bearer ' + newToken);
            request.profile = this.profile;
            return true;
        }
        catch (err) {
            this.logger.error(err.message);
            throw new common_1.ForbiddenException();
        }
    }
    verifyRole() {
    }
};
JwtGuard = JwtGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_jwt_service_1.AppJwtService,
        profile_service_1.ProfileService])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map