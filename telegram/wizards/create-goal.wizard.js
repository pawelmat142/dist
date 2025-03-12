"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGoalWizard = void 0;
const profile_wizard_1 = require("./profile.wizard");
const rrule_1 = require("../../goal/model/rrule");
const util_1 = require("../../global/util");
const bot_util_1 = require("../util/bot.util");
class CreateGoalWizard extends profile_wizard_1.ProfileWizard {
    constructor(profile, services) {
        super(profile, services);
        this.START = 0;
        this.ERROR = 1;
        this.FREQ_SELECT = 2;
        this.BYHOUR_SELECT = 3;
        this.BYHOUR_SELECT_WARNING = 33;
        this.BYMINUTE_SELECT = 4;
        this.BYMINUTE_SELECT_WARNING = 44;
        this.CONFIRM = 5;
        this.BDAY_SELECT = 6;
        this.BYMONTHDAY_SELECT = 7;
        this.BYMONTHDAY_SELECT_WARNING = 77;
        this.NOTIFICATION = 8;
        this.SUCCESS = 9;
        this.rrule = new rrule_1.RRule({ FREQ: '' });
        this.notificationEnabled = false;
        this.getFreqButtons = () => {
            if (this.order !== this.FREQ_SELECT) {
                return [];
            }
            const options = ['DAILY', 'WEEKLY', 'MONTHLY'];
            const buttons = options.map(o => [{
                    text: util_1.Util.toMsg(o),
                    process: async () => {
                        this.rrule.FREQ = o;
                        return this.selectStepByFreq();
                    }
                }]);
            buttons.push([{
                    text: 'Skip',
                    process: async () => {
                        return this.BYHOUR_SELECT;
                    }
                }]);
            return buttons;
        };
        this.selectByhour = async (_input) => {
            let value = Number(_input.trim());
            if (value === 24) {
                value = 0;
            }
            if (rrule_1.byhour.includes(value)) {
                this.rrule.BYHOUR = value;
                return this.BYMINUTE_SELECT;
            }
            return this.BYHOUR_SELECT_WARNING;
        };
        this.selectByminute = async (_input) => {
            let value = Number(_input.trim());
            if (value === 60) {
                value = 0;
            }
            if (rrule_1.byminute.includes(value)) {
                this.rrule.BYMINUTE = value;
                return this.NOTIFICATION;
            }
            return this.BYMINUTE_SELECT_WARNING;
        };
        this.selectBymonthday = async (_input) => {
            let value = Number(_input.trim());
            if (rrule_1.bymonthday.includes(value)) {
                this.rrule.BYMONTHDAY = value;
                return this.BYHOUR_SELECT;
            }
            return this.BYMONTHDAY_SELECT_WARNING;
        };
        this.selectDayOfWeekButtons = () => {
            if (this.order !== this.BDAY_SELECT) {
                return [];
            }
            return rrule_1.bday.map(key => {
                return [{
                        text: rrule_1.bdayMap[key],
                        process: async () => {
                            this.rrule.BDAY = key;
                            return this.BYHOUR_SELECT;
                        }
                    }];
            });
        };
        this.createGoal = async () => {
            try {
                await this.services.goalService.createGoal({
                    name: this.name,
                    notificationEnabled: this.notificationEnabled,
                    telegramChannelId: this.profile.telegramChannelId,
                    rrule: this.rrule
                });
                return this.SUCCESS;
            }
            catch (error) {
                this.error = error;
                this.logger.warn(error);
                return this.ERROR;
            }
        };
    }
    getSteps() {
        return [{
                order: this.START,
                message: [`Enter goal name...`],
                process: async (input) => {
                    if (!input) {
                        this.error = `Empty...`;
                        return this.ERROR;
                    }
                    this.name = input;
                    return this.FREQ_SELECT;
                }
            }, {
                order: this.FREQ_SELECT,
                message: this.prepareMessage(`Select periodicity:`, { skipRrule: true }),
                buttons: this.getFreqButtons()
            }, {
                order: this.BYHOUR_SELECT,
                message: this.prepareMessage(`Enter daytime (hours)...`),
                process: this.selectByhour,
                buttons: [[{
                            text: `Skip daytime`,
                            process: async () => this.NOTIFICATION
                        }]]
            }, {
                order: this.BYHOUR_SELECT_WARNING,
                message: [`It should be number from 0 to 24`],
                nextOrder: this.BYHOUR_SELECT
            }, {
                order: this.BYMINUTE_SELECT,
                message: this.prepareMessage(`Enter daytime (minutes)...`),
                process: this.selectByminute,
                buttons: this.selectMinutesButtons()
            }, {
                order: this.BYMINUTE_SELECT_WARNING,
                message: [`It should be number from 0 to  60`],
                nextOrder: this.BYMINUTE_SELECT
            }, {
                order: this.BDAY_SELECT,
                message: this.prepareMessage(`Select day of the week:`),
                buttons: this.selectDayOfWeekButtons()
            }, {
                order: this.BYMONTHDAY_SELECT,
                message: this.prepareMessage(`Enter day of the month...`),
                process: this.selectBymonthday
            }, {
                order: this.BYMONTHDAY_SELECT_WARNING,
                message: [`It should be number from 1 to 31`],
                nextOrder: this.BYMONTHDAY_SELECT
            }, {
                order: this.CONFIRM,
                message: this.prepareMessage(`Confirm?`, { notificationLine: true }),
                buttons: [[{
                            text: `No`,
                            switch: profile_wizard_1.ProfileWizard.name
                        }, {
                            text: `Yes`,
                            process: this.createGoal
                        }]]
            }, {
                order: this.NOTIFICATION,
                message: this.prepareMessage(`Enable remiders?`),
                buttons: [[{
                            text: `No`,
                            process: async () => {
                                return this.CONFIRM;
                            }
                        }, {
                            text: `Yes`,
                            process: async () => {
                                this.notificationEnabled = true;
                                return this.CONFIRM;
                            }
                        }]]
            }, {
                order: this.SUCCESS,
                message: [`Goal created successfully!`],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }, {
                order: this.ERROR,
                message: [this.error],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }];
    }
    prepareMessage(msg, config) {
        const result = [`Creating new goal:`, ``, this.name];
        if (!(config === null || config === void 0 ? void 0 : config.skipRrule)) {
            result.push(this.rrule.toMsg());
        }
        if (config === null || config === void 0 ? void 0 : config.notificationLine) {
            result.push(`Notifications ${this.notificationEnabled ? 'enabled' : 'disabled'}`);
        }
        result.push(``, msg);
        return result;
    }
    selectStepByFreq() {
        switch (this.rrule.FREQ) {
            case 'DAILY': return this.BYHOUR_SELECT;
            case 'WEEKLY': return this.BDAY_SELECT;
            case 'MONTHLY': return this.BYMONTHDAY_SELECT;
            default: return this.FREQ_SELECT;
        }
    }
    selectMinutesButtons() {
        if (this.order !== this.BYMINUTE_SELECT) {
            return [];
        }
        return [[0, 15], [30, 45]].map(row => {
            return row.map((value) => {
                return {
                    text: `${util_1.Util.withZero(this.rrule.BYHOUR)}:${util_1.Util.withZero(value)}`,
                    process: async () => {
                        this.rrule.BYMINUTE = value;
                        return this.NOTIFICATION;
                    }
                };
            });
        });
    }
}
exports.CreateGoalWizard = CreateGoalWizard;
//# sourceMappingURL=create-goal.wizard.js.map