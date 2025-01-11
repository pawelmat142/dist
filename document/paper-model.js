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
exports.PaperSchema = exports.Paper = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let Paper = class Paper {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Paper.prototype, "formId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "template", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Buffer }),
    __metadata("design:type", Buffer)
], Paper.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Buffer }),
    __metadata("design:type", Buffer)
], Paper.prototype, "contentWithSignatures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Paper.prototype, "extension", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "uid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Paper.prototype, "generationTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Paper.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Array)
], Paper.prototype, "signatures", void 0);
Paper = __decorate([
    (0, mongoose_1.Schema)()
], Paper);
exports.Paper = Paper;
exports.PaperSchema = mongoose_1.SchemaFactory.createForClass(Paper);
//# sourceMappingURL=paper-model.js.map