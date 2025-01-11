"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalStateException = void 0;
const common_1 = require("@nestjs/common");
class IllegalStateException extends common_1.HttpException {
    constructor(msg) {
        super(msg || 'Not modified', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.IllegalStateException = IllegalStateException;
//# sourceMappingURL=illegal-state.exception.js.map