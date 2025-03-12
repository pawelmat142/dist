import { Goal } from './model/goal.model';
import { Model } from 'mongoose';
import { CreateGoal } from './model/interfaces';
import { Observable } from 'rxjs';
export declare class GoalService {
    private goalModel;
    private readonly logger;
    constructor(goalModel: Model<Goal>);
    private reminderSchedulerSubject$;
    get reminderScheduler$(): Observable<Goal>;
    getGoalsToScheduleReminders(): Promise<Goal[]>;
    listDaily(telegramChannelId: string): Promise<Goal[]>;
    listNotDaily(telegramChannelId: string): Promise<Goal[]>;
    listAll(telegramChannelId: string): Promise<Goal[]>;
    findOne(id: string): Promise<Goal>;
    private list;
    createGoal(config: CreateGoal): Promise<Goal>;
    deleteGoal(goal: Goal): Promise<void>;
    mark(_goal: Goal): Promise<Goal>;
    updateGoal(goal: Goal, note?: string): Promise<Goal>;
}
