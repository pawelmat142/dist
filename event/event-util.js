"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUtil = void 0;
const bot_util_1 = require("../telegram/util/bot.util");
class EventUtil {
    static dateString(event) {
        if (event.endDate) {
            return `${bot_util_1.BotUtil.formatDate(event.startDate)} to ${bot_util_1.BotUtil.formatDate(event.endDate)}`;
        }
        return bot_util_1.BotUtil.formatDate(event.startDate);
    }
}
exports.EventUtil = EventUtil;
//# sourceMappingURL=event-util.js.map