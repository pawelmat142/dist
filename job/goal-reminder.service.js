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
exports.GoalReminderService = void 0;
const common_1 = require("@nestjs/common");
const goal_service_1 = require("../goal/goal.service");
const telegram_service_1 = require("../telegram/telegram.service");
const node_schedule_1 = require("node-schedule");
const util_1 = require("../global/util");
const bot_util_1 = require("../telegram/util/bot.util");
let GoalReminderService = class GoalReminderService {
    constructor(telegramService, goalService) {
        this.telegramService = telegramService;
        this.goalService = goalService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.jobs = {};
    }
    onModuleInit() {
        this.scheduleAllReminders();
        this.goalService.reminderScheduler$.subscribe(goal => {
            this.scheduleOrUpdateReminder(goal);
        });
    }
    async scheduleAllReminders() {
        this.logger.log(`[START] schedule reminders`);
        const goals = await this.goalService.getGoalsToScheduleReminders();
        this.logger.log(`Found ${goals.length} Goals to schedule reminders`);
        for (const goal of goals) {
            this.scheduleReminder(goal);
        }
        this.logger.log(`[STOP] schedule reminders`);
    }
    scheduleOrUpdateReminder(goal) {
        if (this.jobs[goal.id]) {
            this.jobs[goal.id].cancel();
            delete this.jobs[goal.id];
            this.logger.log(`Cancelled reminder for Goal ${goal.id}`);
        }
        if (goal.reminder) {
            this.scheduleReminder(goal);
        }
    }
    scheduleReminder(goal) {
        const nextDate = goal.nextDate();
        if (!nextDate) {
            this.logger.warn(`Not found nextDateUTC for Goal ${goal.id}`);
            return;
        }
        const job = (0, node_schedule_1.scheduleJob)(nextDate, () => {
            this.performReminder(goal.id);
        });
        this.logger.log(` `);
        this.logger.log(`Reminder scheduled: ${goal.name}, nextDate: ${nextDate.toDateString()} ${nextDate.toTimeString()}`);
        this.jobs[goal.id] = job;
    }
    async performReminder(goalId) {
        try {
            const goal = await this.findGoal(goalId);
            if (!goal) {
                return;
            }
            const msg = [
                `Reminder of ${util_1.Util.toMsg(goal.rrule.FREQ)} goal`,
                goal.toMsgWithDaytime()
            ];
            const result = await this.telegramService.sendMessage(Number(goal.telegramChannelId), bot_util_1.BotUtil.msgFrom(msg));
            this.logger.log(`Reminder sent ${goal.name}, ${goal.id}`);
            goal.mark('REMINDER');
            this.goalService.updateGoal(goal);
            this.scheduleReminder(goal);
        }
        catch (error) {
            this.logger.error(`PERFORM REMINDER ERROR!`);
            this.logger.error(error);
        }
    }
    async findGoal(goalId) {
        const goal = await this.goalService.findOne(goalId);
        if (!goal) {
            this.logger.warn(`[SKIP] goal not found - probably removed`);
            return null;
        }
        if (goal.status === 'INACTIVE') {
            this.logger.warn(`[SKIP] goal inactive`);
            return null;
        }
        if (!goal.notificationEnabled) {
            this.logger.warn(`[SKIP] notifications disabled`);
            return null;
        }
        return goal;
    }
};
GoalReminderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService,
        goal_service_1.GoalService])
], GoalReminderService);
exports.GoalReminderService = GoalReminderService;
//# sourceMappingURL=goal-reminder.service.js.map