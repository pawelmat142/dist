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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
const event_service_1 = require("./event.service");
const profile_path_param_getter_1 = require("../profile/auth/profile-path-param-getter");
const no_guard_1 = require("../profile/auth/no-guard");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    fetchPromoterEvents(profile) {
        return this.eventService.fetchPromoterEvents(profile);
    }
};
__decorate([
    (0, common_1.Get)('list/panel'),
    (0, common_1.UseGuards)(no_guard_1.NoGuard),
    __param(0, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "fetchPromoterEvents", null);
EventController = __decorate([
    (0, common_1.Controller)('api/event'),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map