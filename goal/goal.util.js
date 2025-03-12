"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalUtil = void 0;
const date_util_1 = require("../global/date.util");
const common_1 = require("@nestjs/common");
class GoalUtil {
    static updateReadyFlag(goals) {
        for (let g of goals) {
            g.ready = this.isReady(g);
        }
    }
    static isReady(goal) {
        var _a, _b, _c;
        switch (goal.rrule.FREQ) {
            case 'DAILY': {
                const todayActions = goal.history
                    .filter(h => ['MARK_READY', 'UNMARK'].includes(h.action))
                    .filter(h => date_util_1.DateUtil.isToday(h.date));
                todayActions.sort((a, b) => b.date.getTime() - a.date.getTime());
                return ((_a = todayActions[0]) === null || _a === void 0 ? void 0 : _a.action) === 'MARK_READY';
            }
            case 'WEEKLY': {
                const weekActions = goal.history
                    .filter(h => ['MARK_READY', 'UNMARK'].includes(h.action))
                    .filter(h => date_util_1.DateUtil.isSameWeek(h.date, new Date()));
                weekActions.sort((a, b) => b.date.getTime() - a.date.getTime());
                return ((_b = weekActions[0]) === null || _b === void 0 ? void 0 : _b.action) === 'MARK_READY';
            }
            case 'MONTHLY': {
                const monthActions = goal.history
                    .filter(h => ['MARK_READY', 'UNMARK'].includes(h.action))
                    .filter(h => date_util_1.DateUtil.isSameMonth(h.date, new Date()));
                monthActions.sort((a, b) => b.date.getTime() - a.date.getTime());
                return ((_c = monthActions[0]) === null || _c === void 0 ? void 0 : _c.action) === 'MARK_READY';
            }
            default: throw new common_1.NotImplementedException();
        }
    }
    static removeOne(goals, id) {
        const index = goals.findIndex(g => g.id === id);
        if (index === -1) {
            return false;
        }
        goals.splice(index, 1);
        return true;
    }
    static updateOne(goals, goal) {
        const index = goals.findIndex(g => g.id === goal.id);
        if (index === -1) {
            return false;
        }
        goals[index] = goal;
        return true;
    }
    static statusMsg(goal) {
        switch (goal.status) {
            case 'ACTIVE': return 'active';
            case 'INACTIVE': return 'paused';
            default: throw new common_1.NotImplementedException();
        }
    }
    static sort(goals, config) {
        goals.sort((a, b) => {
            var _a, _b;
            return (((_a = a.nextDate()) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = b.nextDate()) === null || _b === void 0 ? void 0 : _b.getTime()) || 0);
        });
        if (config === null || config === void 0 ? void 0 : config.byFreqDesc) {
            goals.sort((a, b) => {
                return this.freqOrder[b.rrule.FREQ] - this.freqOrder[a.rrule.FREQ];
            });
        }
        else if (config === null || config === void 0 ? void 0 : config.byFreqAsc) {
            goals.sort((a, b) => {
                return this.freqOrder[a.rrule.FREQ] - this.freqOrder[b.rrule.FREQ];
            });
        }
        if (config === null || config === void 0 ? void 0 : config.readyLast) {
            goals.sort((a, b) => {
                if (a.ready && !b.ready)
                    return 1;
                if (!a.ready && b.ready)
                    return -1;
            });
        }
    }
}
exports.GoalUtil = GoalUtil;
GoalUtil.freqOrder = {
    'MONTHLY': 1,
    'WEEKLY': 2,
    'DAILY': 3
};
//# sourceMappingURL=goal.util.js.map