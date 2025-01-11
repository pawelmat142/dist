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
exports.ProfileSchema = exports.Profile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let Profile = class Profile {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Profile.prototype, "uid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], Profile.prototype, "roles", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Profile.prototype, "artistSignature", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Profile.prototype, "registerMode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Profile.prototype, "telegramChannelId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Profile.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Profile.prototype, "contactEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Profile.prototype, "passwordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Profile.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Profile.prototype, "modified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Profile.prototype, "managerData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], Profile.prototype, "promoterInfo", void 0);
Profile = __decorate([
    (0, mongoose_1.Schema)()
], Profile);
exports.Profile = Profile;
exports.ProfileSchema = mongoose_1.SchemaFactory.createForClass(Profile);
//# sourceMappingURL=profile.model.js.map