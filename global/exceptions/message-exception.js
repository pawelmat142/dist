"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageException = void 0;
const common_1 = require("@nestjs/common");
class MessageException extends common_1.HttpException {
    constructor(message) {
        super(message, 333);
    }
}
exports.MessageException = MessageException;
//# sourceMappingURL=message-exception.js.map