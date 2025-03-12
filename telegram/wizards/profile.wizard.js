"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileWizard = void 0;
const wizard_1 = require("./wizard");
const bot_util_1 = require("../util/bot.util");
class ProfileWizard extends wizard_1.Wizard {
    constructor(profile, services) {
        super(Number(profile.telegramChannelId), services);
        this.profile = profile;
    }
    getProfile() {
        return this.profile;
    }
    getSteps() {
        return [{
                order: 0,
                message: [`Select option...`],
                buttons: [[{
                            text: 'Add new goal',
                            switch: 'CreateGoalWizard'
                        }], [{
                            text: `Manage goals`,
                            switch: `EditGoalWizard`
                        }], [{
                            text: 'Delete account',
                            process: async () => 2
                        }], [{
                            text: `Back`,
                            switch: 'StartWizard'
                        }]],
            }, {
                order: 1,
                message: [this.error],
            }, {
                order: 2,
                message: [`Are you sure?`],
                buttons: [[{
                            text: `No`,
                            process: async () => 0
                        }, {
                            text: `Yes`,
                            process: () => this.deleteAccount()
                        }]]
            }, {
                order: 3,
                message: [`Your profile deleted successfully`],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }, {
                order: 4,
                message: [],
                close: true
            }];
    }
    async deleteAccount() {
        try {
            await this.services.profileService.deleteProfile(this.profile);
            return 4;
        }
        catch (error) {
            this.error = error;
            this.logger.error(error);
            return 2;
        }
    }
}
exports.ProfileWizard = ProfileWizard;
//# sourceMappingURL=profile.wizard.js.map