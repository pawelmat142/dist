import { Goal } from "./model/goal.model";
export declare abstract class GoalUtil {
    static updateReadyFlag(goals: Goal[]): void;
    private static isReady;
    static removeOne(goals: Goal[], id: string): boolean;
    static updateOne(goals: Goal[], goal: Goal): boolean;
    static statusMsg(goal: Goal): string;
    private static freqOrder;
    static sort(goals: Goal[], config?: {
        readyLast?: boolean;
        byFreqDesc?: boolean;
        byFreqAsc?: boolean;
    }): void;
}
