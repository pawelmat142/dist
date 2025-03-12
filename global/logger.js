"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMyLogger = void 0;
const moment = require("moment-timezone");
const winston = require("winston");
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const nest_winston_1 = require("nest-winston");
const timeZone = 'Europe/Warsaw';
const customTimestamp = winston.format((info) => {
    info.timestamp = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    return info;
});
const createMyLogger = () => nest_winston_1.WinstonModule.createLogger({
    instance: (0, winston_1.createLogger)({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(customTimestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('StayOn', {
                    colors: true,
                    prettyPrint: true,
                })),
            }),
            new DailyRotateFile({
                dirname: '../logs',
                filename: '%DATE%_name.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                format: winston.format.combine(customTimestamp(), winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] [${level}] ${message}`;
                })),
            }),
        ]
    })
});
exports.createMyLogger = createMyLogger;
//# sourceMappingURL=logger.js.map