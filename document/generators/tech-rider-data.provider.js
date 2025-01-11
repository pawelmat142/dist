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
exports.TechRiderDataProvider = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("../../profile/profile.service");
const paper_util_1 = require("../paper-util");
let TechRiderDataProvider = class TechRiderDataProvider {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async prepareData(ctx) {
        const managerData = await this.profileService.fetchManagerData(ctx.booking.managerUid);
        return {
            agencyName: managerData.agencyName,
            agencyPhone: managerData.agencyPhone,
            agencyEmail: managerData.agencyEmail,
            agencyFooterString: paper_util_1.PaperUtil.agencyString(managerData),
        };
    }
};
TechRiderDataProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], TechRiderDataProvider);
exports.TechRiderDataProvider = TechRiderDataProvider;
//# sourceMappingURL=tech-rider-data.provider.js.map