"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempWizard = void 0;
const profile_wizard_1 = require("./profile.wizard");
const bot_util_1 = require("../util/bot.util");
class TempWizard extends profile_wizard_1.ProfileWizard {
    constructor(profile, services) {
        super(profile, services);
        this.START = 0;
        this.ERROR = 1;
    }
    getSteps() {
        return [{
                order: this.START,
                message: [`Temp message:`],
                keyboard: [[{
                            text: 'temp',
                            process: async () => {
                                this.error = 'temp';
                                return this.ERROR;
                            }
                        }]],
            }, {
                order: this.ERROR,
                message: [this.error],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }];
    }
}
exports.TempWizard = TempWizard;
//# sourceMappingURL=temp.wizard.js.map