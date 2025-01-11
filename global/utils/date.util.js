"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
class DateUtil {
    static get NOW() {
        return new Date();
    }
    static afterDays(days) {
        return this.addDays(this.NOW, days);
    }
    static afterMonths(months, days) {
        return this.addMonths(this.NOW, months, days);
    }
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    static addMonths(date, months, days) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        if (days) {
            result.setDate(result.getDate() + days);
        }
        return result;
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map