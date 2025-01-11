"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = void 0;
const common_1 = require("@nestjs/common");
class Wizard {
    constructor(chatId, services) {
        this.services = services;
        this.logger = new common_1.Logger(Wizard.name);
        this.initialized = false;
        this.init = async () => {
            if (!this.initialized) {
                await this._init();
                this.initialized = true;
            }
        };
        this._init = async () => { };
        this.chatId = chatId;
        this.order = 0;
        this.modified = new Date();
    }
    getSteps() {
        throw new Error('not implemented');
    }
    getStep() {
        const steps = this.getSteps();
        if (this.order < 0 || this.order > steps.length - 1) {
            this.logger.error(`Invalid order: ${this.order}`);
            return steps[0];
        }
        return steps[this.order];
    }
}
exports.Wizard = Wizard;
//# sourceMappingURL=wizard.js.map