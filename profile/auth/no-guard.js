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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const profile_service_1 = require("../profile.service");
const app_jwt_service_1 = require("./app-jwt.service");
let NoGuard = class NoGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(jwtService, profileService) {
        super();
        this.jwtService = jwtService;
        this.profileService = profileService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        this.profile = undefined;
        try {
            const token = this.jwtService.extractToken(request);
            if (token) {
                const secret = process.env.JWT_SECRET;
                const payload = this.jwtService.verify(token, { secret });
                if (payload === null || payload === void 0 ? void 0 : payload.uid) {
                    this.profile = await this.profileService.fetchForJwt(payload.uid);
                    request.profile = this.profile;
                }
            }
        }
        catch (err) {
        }
        return true;
    }
};
NoGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_jwt_service_1.AppJwtService,
        profile_service_1.ProfileService])
], NoGuard);
exports.NoGuard = NoGuard;
//# sourceMappingURL=no-guard.js.map