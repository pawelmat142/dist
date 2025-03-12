"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditGoalWizard = void 0;
const profile_wizard_1 = require("./profile.wizard");
const bot_util_1 = require("../util/bot.util");
const rrule_1 = require("../../goal/model/rrule");
const goal_util_1 = require("../../goal/goal.util");
class EditGoalWizard extends profile_wizard_1.ProfileWizard {
    constructor(profile, services) {
        super(profile, services);
        this.START = 0;
        this.ERROR = 1;
        this.SELECTED = 2;
        this.NOTIFICATIONS_UPDATED = 3;
        this.CHANGE_NAME = 4;
        this.NAME_CHANGED = 5;
        this.DELETE = 6;
        this.DELETED = 7;
        this.PAUSED = 8;
        this._init = async () => {
            this.goals = await this.services.goalService.listAll(this.profile.telegramChannelId);
            goal_util_1.GoalUtil.updateReadyFlag(this.goals);
            goal_util_1.GoalUtil.sort(this.goals, { byFreqDesc: true });
        };
        this.updateEnableNotifications = async () => {
            this.selectedGoal.notificationEnabled = !this.selectedGoal.notificationEnabled;
            const result = await this.updadeGoal(`${this.selectedGoal.notificationEnabled ? 'enable' : 'disable'} notifications`);
            return result ? this.NOTIFICATIONS_UPDATED : this.ERROR;
        };
        this.pause = async () => {
            let note = '';
            if (this.selectedGoal.status === 'ACTIVE') {
                this.selectedGoal.status = 'INACTIVE';
                note += 'pause';
            }
            else {
                this.selectedGoal.status = 'ACTIVE';
                note += 'resume';
            }
            const result = await this.updadeGoal(note);
            return result ? this.PAUSED : this.ERROR;
        };
        this.updadeGoal = async (note) => {
            try {
                const goal = await this.services.goalService.updateGoal(this.selectedGoal, note);
                goal_util_1.GoalUtil.updateOne(this.goals, goal);
                this.selectedGoal = goal;
                return true;
            }
            catch (error) {
                this.error = error;
                this.logger.warn(error);
                return false;
            }
        };
        this.changeNameProcess = async (input) => {
            if (!input) {
                this.error = `Empty...`;
                return this.ERROR;
            }
            this.selectedGoal.name = input;
            const result = await this.updadeGoal('change name');
            return result ? this.NAME_CHANGED : this.ERROR;
        };
        this.deleteGoal = async () => {
            try {
                await this.services.goalService.deleteGoal(this.selectedGoal);
                goal_util_1.GoalUtil.removeOne(this.goals, this.selectedGoal.id);
                delete this.selectedGoal;
                return this.DELETED;
            }
            catch (error) {
                this.error = error;
                this.logger.warn(error);
                return this.ERROR;
            }
        };
    }
    getSteps() {
        var _a, _b, _c;
        return [{
                order: this.START,
                message: [`Select goal to manage:`],
                buttons: this.listGoalsButtons()
            }, {
                order: this.ERROR,
                message: [this.error],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }, {
                order: this.SELECTED,
                message: [`Options: `],
                buttons: this.editOptionsButtons()
            }, {
                order: this.NOTIFICATIONS_UPDATED,
                message: [`Notifications ${((_a = this.selectedGoal) === null || _a === void 0 ? void 0 : _a.notificationEnabled) ? 'enabled' : 'disabled'}`],
                nextOrder: this.START
            }, {
                order: this.CHANGE_NAME,
                message: [`Enter new name...`],
                process: this.changeNameProcess
            }, {
                order: this.NAME_CHANGED,
                message: [`Name changed`],
                nextOrder: this.START
            }, {
                order: this.DELETE,
                message: [
                    `Delete goal ${(_b = this.selectedGoal) === null || _b === void 0 ? void 0 : _b.name}`,
                    `Are you sure?`
                ],
                buttons: [[{
                            text: 'No',
                            process: this.toStep(this.START)
                        }, {
                            text: `Yes`,
                            process: this.deleteGoal
                        }]]
            }, {
                order: this.DELETED,
                message: [`Goal deleted`],
                nextOrder: this.START
            }, {
                order: this.PAUSED,
                message: [`Goal ${((_c = this.selectedGoal) === null || _c === void 0 ? void 0 : _c.status) === 'ACTIVE' ? 'resumed' : 'paused'} successfully!`],
                nextOrder: this.START
            }];
    }
    listGoalsButtons() {
        if (this.order !== this.START) {
            return [];
        }
        delete this.selectedGoal;
        const result = this.goals.map(g => {
            const rrule = new rrule_1.RRule(g.rrule);
            return [{
                    text: `${g.name}: ${rrule.toMsg()} (${goal_util_1.GoalUtil.statusMsg(g)})`,
                    process: async () => {
                        this.selectedGoal = g;
                        return this.SELECTED;
                    }
                }];
        });
        result.push([{
                text: `Back`,
                switch: profile_wizard_1.ProfileWizard.name
            }]);
        return result;
    }
    editOptionsButtons() {
        var _a, _b;
        if (this.order !== this.SELECTED) {
            return [];
        }
        return [[{
                    text: ((_a = this.selectedGoal) === null || _a === void 0 ? void 0 : _a.notificationEnabled) ? `Disable notifications` : `Enable notifications`,
                    process: this.updateEnableNotifications
                }], [{
                    text: ((_b = this.selectedGoal) === null || _b === void 0 ? void 0 : _b.status) === 'ACTIVE' ? `Pause` : `Resume`,
                    process: this.pause
                }], [{
                    text: `Change name`,
                    process: this.toStep(this.CHANGE_NAME)
                }], [{
                    text: `Delete`,
                    process: this.toStep(this.DELETE)
                }], [{
                    text: `Back`,
                    process: this.toStep(this.START)
                }]];
    }
}
exports.EditGoalWizard = EditGoalWizard;
//# sourceMappingURL=edit-goal.wizard.js.map