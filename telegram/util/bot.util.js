"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotUtil = void 0;
const start_wizard_1 = require("../wizards/start.wizard");
const wiz_btn_1 = require("./wiz-btn");
class BotUtil {
    static backBtn() {
        return {
            text: `Back`,
            switch: start_wizard_1.StartWizard.name
        };
    }
    static swwStep() {
        return {
            order: 0,
            message: [
                `Something went wrong...`,
                `Please contact service`
            ]
        };
    }
    static formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-4);
        return `${day}-${month}-${year}`;
    }
}
exports.BotUtil = BotUtil;
_a = BotUtil;
BotUtil.msgFrom = (lines) => {
    return (lines || []).reduce((acc, line) => acc + line + '\n', '');
};
BotUtil.WiZARD_EXPIRATION_MINUTES = 15;
BotUtil.isExpired = (wizard) => {
    const expirationTime = new Date(wizard.modified);
    expirationTime.setMinutes(expirationTime.getMinutes() + _a.WiZARD_EXPIRATION_MINUTES);
    return expirationTime < new Date();
};
BotUtil.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
BotUtil.findClickedButton = (step, callbackData) => {
    if (step.backButton && callbackData === wiz_btn_1.WizBtn.BACK) {
        BotUtil.addBackBtnIfNeeded(step);
        const btns = step.buttons.pop();
        return btns[0];
    }
    for (let btns of step.buttons || []) {
        for (let btn of btns) {
            if (btn.callback_data) {
                if (btn.callback_data === callbackData) {
                    return btn;
                }
            }
            else {
                if (btn.text === callbackData) {
                    return btn;
                }
            }
        }
    }
};
BotUtil.addBackBtnIfNeeded = (step) => {
    if (step.backButton) {
        BotUtil.addBackBtn(step);
    }
};
BotUtil.addBackBtn = (step) => {
    step.buttons = step.buttons || [];
    step.buttons.push([{
            text: 'Back',
            callback_data: wiz_btn_1.WizBtn.BACK,
            process: async () => 0
        }]);
};
//# sourceMappingURL=bot.util.js.map