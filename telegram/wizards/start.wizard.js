"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartWizard = void 0;
const profile_wizard_1 = require("./profile.wizard");
const bot_util_1 = require("../util/bot.util");
const goal_util_1 = require("../../goal/goal.util");
const rrule_1 = require("../../goal/model/rrule");
class StartWizard extends profile_wizard_1.ProfileWizard {
    constructor(profile, services) {
        super(profile, services);
        this.START = 0;
        this.ERROR = 1;
        this.OTHER_GOALS = 2;
        this._init = async () => {
            this.goals = await this.services.goalService.listDaily(this.profile.telegramChannelId);
            this.prepareList();
        };
    }
    getSteps() {
        return [{
                order: this.START,
                message: [`Your daily goals:`],
                keyboard: this.dailyGoalButtons(),
            }, {
                order: this.ERROR,
                message: [this.error],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }, {
                order: this.OTHER_GOALS,
                message: [`Other goals:`],
                keyboard: this.otherGoalButtons()
            }];
    }
    dailyGoalButtons() {
        if (this.START !== this.order) {
            return [];
        }
        const buttons = this.goals.map(g => [{
                text: this.dailyGoalButtonText(g),
                process: () => this.markGoalReady(g)
            }]);
        buttons.push([{
                text: `Others goals`,
                process: async () => {
                    this.goals = await this.services.goalService.listNotDaily(this.profile.telegramChannelId);
                    return this.OTHER_GOALS;
                }
            }, {
                text: `Options`,
                switch: profile_wizard_1.ProfileWizard.name
            }]);
        return buttons;
    }
    otherGoalButtons() {
        if (this.OTHER_GOALS !== this.order) {
            return [];
        }
        const buttons = this.goals.map(g => [{
                text: this.otherGoalButtonText(g),
                process: () => this.markGoalReady(g)
            }]);
        buttons.push([{
                text: `Daily goals`,
                process: async () => {
                    this.goals = await this.services.goalService.listDaily(this.profile.telegramChannelId);
                    return this.START;
                }
            }, {
                text: `Options`,
                switch: profile_wizard_1.ProfileWizard.name
            }]);
        return buttons;
    }
    async markGoalReady(_goal) {
        try {
            const goal = await this.services.goalService.mark(_goal);
            goal_util_1.GoalUtil.updateOne(this.goals, goal);
            this.prepareList();
            return this.START;
        }
        catch (error) {
            this.error = error;
            this.logger.error(error);
            return this.ERROR;
        }
    }
    dailyGoalButtonText(goal) {
        let msg = goal.toMsgWithDaytime();
        msg += ` ${goal.ready ? '(ready)' : '- TODO !!'}`;
        return msg;
    }
    otherGoalButtonText(goal) {
        const rrule = new rrule_1.RRule(goal.rrule);
        return `${rrule.toMsg()}: ${goal.name}`;
    }
    prepareList() {
        goal_util_1.GoalUtil.updateReadyFlag(this.goals);
        goal_util_1.GoalUtil.sort(this.goals, { byFreqAsc: true });
    }
}
exports.StartWizard = StartWizard;
//# sourceMappingURL=start.wizard.js.map