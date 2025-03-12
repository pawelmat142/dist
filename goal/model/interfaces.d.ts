import { RRuleI } from "./rrule";
import { Priority } from "./goal.model";
export interface CreateGoal {
    telegramChannelId: string;
    name: string;
    notificationEnabled: boolean;
    priority?: Priority;
    rrule: RRuleI;
}
