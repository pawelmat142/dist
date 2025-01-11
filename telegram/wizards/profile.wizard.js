"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileWizard = void 0;
const bot_util_1 = require("../util/bot.util");
const wizard_1 = require("./wizard");
class ProfileWizard extends wizard_1.Wizard {
    constructor(profile, services) {
        super(Number(profile.telegramChannelId), services);
        this.profile = profile;
    }
    getProfile() {
        return this.profile;
    }
    getSteps() {
        var _a, _b;
        const loginUrl = bot_util_1.BotUtil.prepareLoginUrl();
        if (!loginUrl) {
            return [bot_util_1.BotUtil.swwStep()];
        }
        return [{
                order: 0,
                message: [
                    `Hi, ${(_a = this.profile) === null || _a === void 0 ? void 0 : _a.name}`,
                    `Welcome to Stage Art`,
                    `your name: ${(_b = this.profile) === null || _b === void 0 ? void 0 : _b.name}`,
                ],
                buttons: [[{
                            text: 'Login page',
                            url: loginUrl
                        }], [{
                            text: 'Delete account',
                            process: async () => 4
                        }]],
            }, {
                order: 1,
            }, {
                order: 2,
                message: [this.error],
                close: true
            }, {
                order: 3,
            }, {
                order: 4,
                message: [`Are you sure?`],
                buttons: [[{
                            text: `No`,
                            process: async () => 0
                        }, {
                            text: `Yes`,
                            process: () => this.deleteAccount()
                        }]]
            }, {
                order: 5,
                message: [`Your profile deleted successfully`],
                close: true
            }];
    }
    async deleteAccount() {
        try {
            await this.services.profileTelegramService.deleteByTelegram(this.profile);
            return 5;
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