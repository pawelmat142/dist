"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const luxon_1 = require("luxon");
class DateUtil {
    static isToday(date) {
        if (!date) {
            return false;
        }
        const today = new Date();
        return date.getFullYear() === today.getFullYear()
            && date.getMonth() === today.getMonth()
            && date.getDate() === today.getDate();
    }
    static isSameWeek(date1, date2) {
        const startOfWeek = (date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() - d.getDay());
            return d;
        };
        return startOfWeek(date1).getTime() === startOfWeek(date2).getTime();
    }
    static isSameMonth(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth());
    }
    static get now() {
        return new Date();
    }
    static toLocalDate(date) {
        const offset = luxon_1.DateTime.fromJSDate(date, { zone: 'UTC' })
            .setZone('Europe/Warsaw')
            .offset / 60;
        return new Date(date.getTime() + offset * 60 * 60 * 1000);
    }
    static fromLocalDate(date) {
        const offset = luxon_1.DateTime.fromJSDate(date, { zone: 'Europe/Warsaw' })
            .offset / 60;
        return new Date(date.getTime() - offset * 60 * 60 * 1000);
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map