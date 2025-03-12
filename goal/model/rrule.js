"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RRule = exports.byminute = exports.byhour = exports.bymonthday = exports.bdayMap = exports.bday = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("../../global/util");
exports.bday = [
    'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'
];
exports.bdayMap = {
    'MO': 'Monday',
    'TU': 'Tuesday',
    'WE': 'Wednesday',
    'TH': 'Thursday',
    'FR': 'Friday',
    'SA': 'Saturday',
    'SU': 'Sunday'
};
exports.bymonthday = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];
exports.byhour = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23
];
exports.byminute = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
];
class RRule {
    constructor(rrule) {
        this.FREQ = rrule.FREQ;
        this.INTERVAL = rrule.INTERVAL;
        this.BDAY = rrule.BDAY;
        this.BYMONTHDAY = rrule.BYMONTHDAY;
        this.BYHOUR = rrule.BYHOUR;
        this.BYMINUTE = rrule.BYMINUTE;
    }
    toMsg() {
        let message = '';
        if (this.FREQ) {
            message += `Every `;
            if (this.FREQ === 'DAILY') {
                message += `day`;
            }
            else if (this.BDAY) {
                message += `${exports.bdayMap[this.BDAY]}`;
            }
            else if (this.BYMONTHDAY) {
                message += `${this.BYMONTHDAY}. day of month`;
            }
            else {
                message += `${util_1.Util.toMsg(this.FREQ)
                    .toLocaleLowerCase()
                    .replace('ily', 'y')
                    .replace('ly', '')}`;
            }
        }
        else {
            message += `Single goal`;
        }
        const daytime = util_1.Util.daytimeString(this.BYHOUR, this.BYMINUTE);
        if (daytime) {
            message += ` at ${daytime}`;
        }
        return message;
    }
    toString() {
        let rruleParts = [];
        if (this.FREQ) {
            rruleParts.push(`FREQ=${this.FREQ}`);
        }
        if (this.INTERVAL) {
            rruleParts.push(`INTERVAL=${this.INTERVAL}`);
        }
        if (this.BDAY) {
            rruleParts.push(`BYDAY=${this.BDAY}`);
        }
        if (this.BYMONTHDAY) {
            rruleParts.push(`BYMONTHDAY=${this.BYMONTHDAY}`);
        }
        if (this.BYHOUR !== undefined) {
            rruleParts.push(`BYHOUR=${this.BYHOUR}`);
        }
        if (this.BYMINUTE !== undefined) {
            rruleParts.push(`BYMINUTE=${this.BYMINUTE}`);
        }
        return `RRULE:${rruleParts.join(';')}`;
    }
    static from(rruleStr) {
        if (rruleStr.startsWith("RRULE:")) {
            rruleStr = rruleStr.slice("RRULE:".length);
        }
        else {
            throw new common_1.BadRequestException(`Wrong RRULE string ${rruleStr}`);
        }
        const parts = rruleStr.split(";");
        const rule = {};
        parts.forEach(part => {
            const [key, value] = part.split("=");
            switch (key) {
                case "FREQ":
                    rule.FREQ = value;
                    break;
                case "INTERVAL":
                    rule.INTERVAL = parseInt(value, 10);
                    break;
                case "BYDAY":
                    rule.BDAY = value;
                    break;
                case "BYMONTHDAY":
                    rule.BYMONTHDAY = parseInt(value, 10);
                    break;
                case "BYHOUR":
                    rule.BYHOUR = parseInt(value, 10);
                    break;
                case "BYMINUTE":
                    rule.BYMINUTE = parseInt(value, 10);
                    break;
                default:
                    throw new common_1.BadRequestException(`Unknown key ${key}`);
            }
        });
        return new RRule(rule);
    }
    setRRuleDefaultValues() {
        if (!this.BYMINUTE && this.BYMINUTE !== 0) {
            this.BYMINUTE = RRule.DEFAULT_BYMINUTE;
        }
        if (!this.BYHOUR && this.BYHOUR !== 0) {
            this.BYHOUR = RRule.DEFAULT_BYHOUR;
        }
        return this;
    }
}
exports.RRule = RRule;
RRule.DEFAULT_BYHOUR = 7;
RRule.DEFAULT_BYMINUTE = 30;
//# sourceMappingURL=rrule.js.map