"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJwtService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AppJwtService = class AppJwtService extends jwt_1.JwtService {
    constructor() {
        super(...arguments);
        this.SECRET = process.env.JWT_SECRET;
    }
    signIn(profile) {
        const payload = this.createPayload(profile);
        return super.sign(payload, { secret: this.SECRET });
    }
    newToken(payload) {
        payload.iat = Date.now();
        payload.exp = this.getExpirationTimestamp();
        return super.sign(payload, { secret: this.SECRET });
    }
    extractToken(request) {
        const headers = request.rawHeaders || [];
        const index = headers.findIndex((header) => header.toLowerCase() === 'authorization');
        if (index === -1)
            return '';
        const [prefix, token] = headers[index + 1].split(' ');
        if (prefix !== 'Bearer')
            return '';
        return token;
    }
    getPayload(token) {
        return jwt.decode(token);
    }
    isExpired(payload) {
        return Date.now() >= payload.exp;
    }
    createPayload(profile) {
        return {
            uid: profile.uid,
            roles: profile.roles,
            name: profile.name,
            telegramChannelId: profile.telegramChannelId,
            artistSignature: profile.artistSignature,
            exp: this.getExpirationTimestamp(),
            iat: Date.now()
        };
    }
    getExpirationTimestamp() {
        const now = new Date();
        return now.setDate(now.getDate() + 2).valueOf();
    }
};
AppJwtService = __decorate([
    (0, common_1.Injectable)()
], AppJwtService);
exports.AppJwtService = AppJwtService;
//# sourceMappingURL=app-jwt.service.js.map