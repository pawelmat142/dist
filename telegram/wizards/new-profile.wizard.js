"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProfileWizard = void 0;
const role_1 = require("../../profile/model/role");
const bot_util_1 = require("../util/bot.util");
const wizard_1 = require("./wizard");
class NewProfileWizard extends wizard_1.Wizard {
    constructor(chatId, services) {
        super(chatId, services);
        this.profile = {};
        this.profile.telegramChannelId = chatId.toString();
    }
    getSteps() {
        var _a;
        const loginUrl = bot_util_1.BotUtil.prepareLoginUrl();
        if (!loginUrl) {
            return [bot_util_1.BotUtil.swwStep()];
        }
        return [{
                order: 0,
                message: [
                    `StageArt - Artist Booking platform`,
                    `Would you like to register?`
                ],
                buttons: [[{
                            text: 'No',
                            process: async () => 2
                        }, {
                            text: `Yes`,
                            process: async () => 1
                        }]]
            }, {
                order: 1,
                message: ['Provide your name...'],
                process: async (input) => {
                    if (!input) {
                        this.error = `Empty...`;
                        return 1;
                    }
                    const checkName = await this.services.profileTelegramService.findByName(input);
                    if (checkName) {
                        this.error = `Name alredy in use...`;
                        return 1;
                    }
                    this.profile.name = input;
                    return 3;
                }
            }, {
                order: 2,
                message: [`Bye`],
                close: true
            }, {
                order: 3,
                message: [`Select your role: `],
                buttons: [[{
                            text: `Manager`,
                            process: async () => this.selectoRole(role_1.Role.MANAGER)
                        }], [{
                            text: `Promoter`,
                            process: async () => this.selectoRole(role_1.Role.PROMOTER)
                        }], [{
                            text: `Artist`,
                            process: async () => this.selectoRole(role_1.Role.ARTIST)
                        }]]
            }, {
                order: 4,
                message: [this.error],
                close: true
            }, {
                order: 5,
                message: [`Profile with name ${this.profile.name} and role: ${(_a = this.profile.roles) === null || _a === void 0 ? void 0 : _a.join(', ')} will be created`],
                buttons: [[{
                            text: 'Cancel',
                            process: async () => 0
                        }, {
                            text: 'Confirm',
                            process: async () => this.createProfile()
                        }]],
            }, {
                order: 6,
                message: ['Registered!'],
                buttons: [[{
                            text: 'Login page',
                            url: loginUrl
                        }]],
                close: true
            }];
    }
    async selectoRole(role) {
        this.profile.roles = [role];
        return 5;
    }
    async createProfile() {
        try {
            await this.services.profileTelegramService.createProfile(this.profile);
            return 6;
        }
        catch (error) {
            this.error = error;
            this.logger.warn(error);
            return 4;
        }
    }
}
exports.NewProfileWizard = NewProfileWizard;
NewProfileWizard.USDT_MIN_LIMIT = 10;
//# sourceMappingURL=new-profile.wizard.js.map