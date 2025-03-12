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
exports.GoalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const goal_model_1 = require("./model/goal.model");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const rrule_1 = require("./model/rrule");
const rxjs_1 = require("rxjs");
let GoalService = class GoalService {
    constructor(goalModel) {
        this.goalModel = goalModel;
        this.logger = new common_1.Logger(this.constructor.name);
        this.reminderSchedulerSubject$ = new rxjs_1.Subject();
    }
    get reminderScheduler$() {
        return this.reminderSchedulerSubject$.asObservable();
    }
    getGoalsToScheduleReminders() {
        return this.goalModel.find({
            status: 'ACTIVE',
            notificationEnabled: true,
        }).exec();
    }
    listDaily(telegramChannelId) {
        return this.list(telegramChannelId, {
            "rrule.FREQ": 'DAILY',
            status: 'ACTIVE'
        });
    }
    listNotDaily(telegramChannelId) {
        return this.list(telegramChannelId, {
            "rrule.FREQ": { $ne: 'DAILY' },
            status: 'ACTIVE'
        });
    }
    listAll(telegramChannelId) {
        return this.list(telegramChannelId);
    }
    findOne(id) {
        return this.goalModel.findOne({ id }).exec();
    }
    list(telegramChannelId, additionalFilter) {
        const filter = { telegramChannelId };
        if (additionalFilter) {
            Object.assign(filter, additionalFilter);
        }
        return this.goalModel.find(filter).exec();
    }
    async createGoal(config) {
        const rrule = new rrule_1.RRule(config.rrule).setRRuleDefaultValues();
        const goal = new this.goalModel({
            id: (0, uuid_1.v4)(),
            telegramChannelId: config.telegramChannelId,
            name: config.name,
            rrule: rrule,
            status: 'ACTIVE',
            priority: config.priority,
            notificationEnabled: config.notificationEnabled,
            history: [{
                    action: 'CREATE',
                    date: new Date()
                }]
        });
        const result = await goal.save();
        this.logger.log(`Created new Goal for user: ${result.telegramChannelId}`);
        this.reminderSchedulerSubject$.next(result);
        return result;
    }
    async deleteGoal(goal) {
        const result = await this.goalModel.deleteOne({ id: goal.id }).exec();
        if (!result.deletedCount) {
            throw new common_1.NotFoundException(`Not found goal with id: ${goal.id}`);
        }
        this.logger.log(`Deleted Goal ${goal.id}`);
    }
    async mark(_goal) {
        const goal = await this.goalModel.findOne({ id: _goal.id }).exec();
        if (!goal) {
            throw new common_1.NotFoundException(`Goal not found`);
        }
        goal.mark(_goal.ready ? 'UNMARK' : 'MARK_READY');
        const result = await this.goalModel.updateOne({ id: goal.id }, { $set: goal });
        if (!result.modifiedCount) {
            throw new common_1.NotFoundException(`Goal not modified`);
        }
        this.logger.log(`Marked Goal ${goal.id} by ${goal.telegramChannelId}`);
        return goal;
    }
    async updateGoal(goal, note) {
        goal.mark('EDIT', note);
        const result = await this.goalModel
            .updateOne({ id: goal.id }, { $set: goal })
            .exec();
        if (!result.modifiedCount) {
            throw new common_1.NotFoundException(`Goal not modified`);
        }
        this.logger.log(`Updated Goal ${goal.id} by ${goal.telegramChannelId}`);
        this.reminderSchedulerSubject$.next(goal);
        return goal;
    }
};
GoalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goal_model_1.Goal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoalService);
exports.GoalService = GoalService;
//# sourceMappingURL=goal.service.js.map