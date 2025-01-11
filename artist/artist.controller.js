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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistController = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("./artist.service");
const serialize_interceptor_1 = require("../global/interceptors/serialize.interceptor");
const artist_view_dto_1 = require("./model/artist-view.dto");
const profile_path_param_getter_1 = require("../profile/auth/profile-path-param-getter");
const jwt_guard_1 = require("../profile/auth/jwt.guard");
const role_guard_1 = require("../profile/auth/role.guard");
const role_1 = require("../profile/model/role");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const no_guard_1 = require("../profile/auth/no-guard");
const artist_manager_service_1 = require("./artist-manager.service");
let ArtistController = class ArtistController {
    constructor(artistService, artistManagerService) {
        this.artistService = artistService;
        this.artistManagerService = artistManagerService;
    }
    createArtist(artist, profile) {
        return this.artistService.createArtist(artist, profile);
    }
    fetchArtist(query) {
        return this.artistService.fetchArtist(query);
    }
    fetchArtists() {
        return this.artistService.fetchArtists();
    }
    updateArtistView(artist, profile) {
        return this.artistService.updateArtistView(artist, profile);
    }
    listMusicStyles() {
        return this.artistService.listMusicStyles();
    }
    listArtistLabels() {
        return this.artistService.listArtistLabels();
    }
    fetchArtistsOfManager(profile) {
        return this.artistManagerService.fetchArtistsOfManager(profile);
    }
    putManagementNotes(body, profile) {
        return this.artistManagerService.putManagementNotes(body, profile);
    }
    setStatus(status, signature, profile) {
        return this.artistManagerService.setStatus(status, signature, profile);
    }
    getTimeline(artistSignature) {
        return this.artistService.getTimeline(artistSignature);
    }
    submitTimelineEvent(artistSignature, body, profile) {
        return this.artistManagerService.submitTimelineEvent(artistSignature, body, profile);
    }
    removeTimelineEvent(artistSignature, id, profile) {
        this.artistManagerService.removeTimelineEvent(artistSignature, id, profile);
    }
};
__decorate([
    (0, common_1.Post)('artist/create'),
    (0, serialize_interceptor_1.Serialize)(artist_view_dto_1.ArtistViewDto),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "createArtist", null);
__decorate([
    (0, common_1.Get)('artist'),
    (0, serialize_interceptor_1.Serialize)(artist_view_dto_1.ArtistViewDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "fetchArtist", null);
__decorate([
    (0, common_1.Get)('artists'),
    (0, serialize_interceptor_1.Serialize)(artist_view_dto_1.ArtistViewDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "fetchArtists", null);
__decorate([
    (0, common_1.Put)('artist'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_view_dto_1.ArtistViewDto, Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "updateArtistView", null);
__decorate([
    (0, common_1.Get)('list-music-styles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "listMusicStyles", null);
__decorate([
    (0, common_1.Get)('artist/list-labels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "listArtistLabels", null);
__decorate([
    (0, common_1.Get)('artists/of-manager'),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_1.Role.MANAGER)),
    (0, serialize_interceptor_1.Serialize)(artist_view_dto_1.ArtistViewDto),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "fetchArtistsOfManager", null);
__decorate([
    (0, common_1.Put)('artist/management-notes'),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_1.Role.MANAGER)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "putManagementNotes", null);
__decorate([
    (0, common_1.Put)('artist/set-status/:status/:signature'),
    (0, common_1.UseGuards)((0, role_guard_1.RoleGuard)(role_1.Role.MANAGER)),
    __param(0, (0, common_1.Param)('status')),
    __param(1, (0, common_1.Param)('signature')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "setStatus", null);
__decorate([
    (0, common_1.Get)(`artist/timeline`),
    __param(0, (0, common_1.Param)('artistSignature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Put)(`artist/submit-timeline-event/:artistSignature`),
    (0, common_1.UseGuards)(no_guard_1.NoGuard),
    __param(0, (0, common_1.Param)('artistSignature')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "submitTimelineEvent", null);
__decorate([
    (0, common_1.Delete)(`artist/timeline/:artistSignature/:id`),
    (0, common_1.UseGuards)(no_guard_1.NoGuard),
    __param(0, (0, common_1.Param)('artistSignature')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ArtistController.prototype, "removeTimelineEvent", null);
ArtistController = __decorate([
    (0, common_1.Controller)('api'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    __metadata("design:paramtypes", [artist_service_1.ArtistService,
        artist_manager_service_1.ArtistManagerService])
], ArtistController);
exports.ArtistController = ArtistController;
//# sourceMappingURL=artist.controller.js.map