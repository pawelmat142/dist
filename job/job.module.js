"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const common_1 = require("@nestjs/common");
const goal_reminder_service_1 = require("./goal-reminder.service");
const goal_module_1 = require("../goal/goal.module");
const telegram_module_1 = require("../telegram/telegram.module");
let JobModule = class JobModule {
};
JobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            goal_module_1.GoalModule,
            telegram_module_1.TelegramModule
        ],
        providers: [goal_reminder_service_1.GoalReminderService]
    })
], JobModule);
exports.JobModule = JobModule;
//# sourceMappingURL=job.module.js.map