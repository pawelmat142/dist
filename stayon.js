"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalLogger = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const logger_1 = require("./global/logger");
const exception_filter_1 = require("./global/exceptions/exception-filter");
dotenv.config();
exports.globalLogger = new common_1.Logger('GLOBAL');
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: (0, logger_1.createMyLogger)(),
    });
    app.useGlobalFilters(new exception_filter_1.AppExceptionFilter());
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    exports.globalLogger.log(`Listening on port ${port}`);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=stayon.js.map