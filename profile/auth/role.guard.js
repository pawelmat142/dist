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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("./jwt.guard");
const app_jwt_service_1 = require("./app-jwt.service");
const profile_service_1 = require("../profile.service");
function RoleGuard(role) {
    return (0, common_1.mixin)(class extends RoleGuardBase {
        constructor(jwtService, profileService) {
            super(jwtService, profileService);
            this.jwtService = jwtService;
            this.profileService = profileService;
        }
        verifyRole() {
            if (!role) {
                throw new common_1.ForbiddenException(`Not found role`);
            }
            if (!this.profile) {
                throw new common_1.ForbiddenException(`Not found profile`);
            }
            if (!this.profile.roles.includes(role)) {
                throw new common_1.UnauthorizedException(`Role ${role} doesnt match with profile roles: ${this.profile.roles.join(', ')}`);
            }
            this.logger.log(`Passed profile ${this.profile.uid} with role: ${role}`);
        }
    });
}
exports.RoleGuard = RoleGuard;
let RoleGuardBase = class RoleGuardBase extends jwt_guard_1.JwtGuard {
    get loggerName() {
        return 'RoleGuard';
    }
    constructor(jwtService, profileService) {
        super(jwtService, profileService);
        this.jwtService = jwtService;
        this.profileService = profileService;
    }
};
RoleGuardBase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_jwt_service_1.AppJwtService,
        profile_service_1.ProfileService])
], RoleGuardBase);
//# sourceMappingURL=role.guard.js.map