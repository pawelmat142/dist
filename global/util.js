"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static toMsg(input) {
        return input
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/^\w/, (c) => c.toUpperCase());
    }
    static withZero(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    static daytimeString(h, m) {
        if (!h && h !== 0) {
            return '';
        }
        return `${this.withZero(h)}:${!m && m !== 0 ? 'XX' : this.withZero(m)}`;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map