"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfile = void 0;
const common_1 = require("@nestjs/common");
exports.GetProfile = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.profile;
});
//# sourceMappingURL=profile-path-param-getter.js.map