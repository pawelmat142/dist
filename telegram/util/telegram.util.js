"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramUtil = void 0;
const crypto = require("crypto");
class TelegramUtil {
    static loginToken() {
        return crypto.randomUUID();
    }
    static pin() {
        const pin = Math.floor(Math.random() * 10000);
        return pin.toString().padStart(4, '0');
    }
    static emailByTelegram(telegramChannelId) {
        return `${telegramChannelId}@book-agency-telegram.com`;
    }
    static passwordByTelegram(telegramChannelId) {
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error("Missing secret key");
        }
        const hmac = crypto.createHmac('sha256', secretKey);
        hmac.update(telegramChannelId);
        const hash = hmac.digest('hex');
        return hash;
    }
}
exports.TelegramUtil = TelegramUtil;
//# sourceMappingURL=telegram.util.js.map