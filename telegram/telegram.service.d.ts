import { OnModuleInit } from '@nestjs/common';
import { WizardService } from './wizard.service';
import TelegramBot = require("node-telegram-bot-api");
import { ProfileTelegramService } from '../profile/profile-telegram.service';
export declare class TelegramService implements OnModuleInit {
    private readonly wizardService;
    private readonly profileTelegramService;
    private readonly logger;
    private readonly channelId;
    constructor(wizardService: WizardService, profileTelegramService: ProfileTelegramService);
    onModuleInit(): void;
    sendMessage(chatId: number, message: string): Promise<TelegramBot.Message>;
}
