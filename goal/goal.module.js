"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const goal_model_1 = require("./model/goal.model");
const goal_service_1 = require("./goal.service");
let GoalModule = class GoalModule {
};
GoalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{
                    name: goal_model_1.Goal.name,
                    schema: goal_model_1.GoalSchema
                }]),
        ],
        providers: [
            goal_service_1.GoalService
        ],
        exports: [
            goal_service_1.GoalService
        ]
    })
], GoalModule);
exports.GoalModule = GoalModule;
//# sourceMappingURL=goal.module.js.map