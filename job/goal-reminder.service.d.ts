import { OnModuleInit } from '@nestjs/common';
import { GoalService } from 'src/goal/goal.service';
import { TelegramService } from 'src/telegram/telegram.service';
export declare class GoalReminderService implements OnModuleInit {
    private readonly telegramService;
    private readonly goalService;
    private readonly logger;
    constructor(telegramService: TelegramService, goalService: GoalService);
    private jobs;
    onModuleInit(): void;
    private scheduleAllReminders;
    private scheduleOrUpdateReminder;
    private scheduleReminder;
    private performReminder;
    private findGoal;
}
