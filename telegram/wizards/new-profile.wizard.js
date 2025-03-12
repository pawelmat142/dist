"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProfileWizard = void 0;
const wizard_1 = require("./wizard");
const bot_util_1 = require("../util/bot.util");
class NewProfileWizard extends wizard_1.Wizard {
    constructor(chatId, services) {
        super(chatId, services);
        this.profile = {};
        this.profile.telegramChannelId = chatId.toString();
    }
    getSteps() {
        return [{
                order: 0,
                message: [
                    `StayOnBot`,
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
                message: ['Provide your unique name...'],
                process: async (input) => {
                    if (!input) {
                        this.error = `Empty...`;
                        return 1;
                    }
                    const checkName = await this.services.profileService.findByName(input);
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
                message: [`Profile with name ${this.profile.name} will be created`],
                buttons: [[{
                            text: 'Cancel',
                            process: async () => {
                                return 0;
                            }
                        }, {
                            text: 'Confirm',
                            process: async () => {
                                return this.createProfile();
                            }
                        }]],
            }, {
                order: 4,
                message: [this.error],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }, {
                order: 5,
                message: ['Registered!'],
                buttons: [[bot_util_1.BotUtil.backBtn()]]
            }, {
                order: 6,
                message: [],
                close: true
            }];
    }
    async createProfile() {
        try {
            await this.services.profileService.createProfile(this.profile);
            return 5;
        }
        catch (error) {
            this.error = error;
            this.logger.warn(error);
            return 4;
        }
    }
}
exports.NewProfileWizard = NewProfileWizard;
//# sourceMappingURL=new-profile.wizard.js.map