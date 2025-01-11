"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUtil = void 0;
const illegal_state_exception_1 = require("../global/exceptions/illegal-state.exception");
class FormUtil {
    static get(formData, path) {
        const properties = path.split('.');
        let current = formData;
        for (const prop of properties) {
            if (current == null || !current.hasOwnProperty(prop)) {
                throw new illegal_state_exception_1.IllegalStateException(`Property "${prop}" is missing in path "${path}"`);
            }
            current = current[prop];
        }
        return current;
    }
}
exports.FormUtil = FormUtil;
//# sourceMappingURL=form.util.js.map