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
exports.BookingSchema = exports.Booking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
let Booking = class Booking {
};
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Booking.prototype, "formId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Booking.prototype, "promoterUid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Booking.prototype, "managerUid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Array)
], Booking.prototype, "artists", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Booking.prototype, "eventSignature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], Booking.prototype, "formData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], Booking.prototype, "checklist", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Array)
], Booking.prototype, "statusHistory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Booking.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Booking.prototype, "modified", void 0);
Booking = __decorate([
    (0, mongoose_1.Schema)()
], Booking);
exports.Booking = Booking;
exports.BookingSchema = mongoose_1.SchemaFactory.createForClass(Booking);
//# sourceMappingURL=booking.model.js.map