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
exports.GoalSchema = exports.Goal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const rrule_1 = require("./rrule");
const util_1 = require("../../global/util");
const rrule_2 = require("rrule");
const date_util_1 = require("../../global/date.util");
let Goal = class Goal {
    mark(action, note) {
        const now = date_util_1.DateUtil.now;
        this.history.push({
            action: action || "MARK_READY",
            date: now,
            note
        });
        this.modified = now;
    }
    toMsgWithDaytime() {
        let msg = util_1.Util.daytimeString(this.rrule.BYHOUR, this.rrule.BYMINUTE);
        if (msg) {
            msg = `[${msg}] `;
        }
        msg += this.name;
        return msg;
    }
    get reminder() {
        return this.status === 'ACTIVE' && this.notificationEnabled;
    }
    nextDate() {
        const ruleString = new rrule_1.RRule(this.rrule)
            .setRRuleDefaultValues()
            .toString();
        const rrule = rrule_2.RRule.fromString(ruleString);
        return date_util_1.DateUtil.fromLocalDate(rrule.after(new Date(), true));
    }
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "telegramChannelId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", rrule_1.RRule)
], Goal.prototype, "rrule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Goal.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Goal.prototype, "notificationEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Goal.prototype, "history", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Goal.prototype, "modified", void 0);
Goal = __decorate([
    (0, mongoose_1.Schema)()
], Goal);
exports.Goal = Goal;
exports.GoalSchema = mongoose_1.SchemaFactory.createForClass(Goal);
exports.GoalSchema.loadClass(Goal);
//# sourceMappingURL=goal.model.js.map