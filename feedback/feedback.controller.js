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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const feedback_model_1 = require("./feedback.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const profile_interceptor_1 = require("../global/interceptors/profile.interceptor");
const profile_path_param_getter_1 = require("../profile/auth/profile-path-param-getter");
const log_interceptor_1 = require("../global/interceptors/log.interceptor");
let FeedbackController = class FeedbackController {
    constructor(feedbackModel) {
        this.feedbackModel = feedbackModel;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    sendFeedback(body, profile) {
        const feedback = new this.feedbackModel({
            created: new Date(),
            lines: body.value.split(/\r?\n/),
            uid: (profile === null || profile === void 0 ? void 0 : profile.uid) || 'anonymous'
        });
        this.logger.log(feedback.lines);
        return feedback.save();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, profile_path_param_getter_1.GetProfile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FeedbackController.prototype, "sendFeedback", null);
FeedbackController = __decorate([
    (0, common_1.Controller)('api/feedback'),
    (0, common_1.UseInterceptors)(profile_interceptor_1.ProfileInterceptor),
    (0, common_1.UseInterceptors)(log_interceptor_1.LogInterceptor),
    __param(0, (0, mongoose_2.InjectModel)(feedback_model_1.Feedback.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FeedbackController);
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback.controller.js.map