import { WizardService } from './wizard.service';
import TelegramBot = require("node-telegram-bot-api");
export declare class TelegramService {
    private readonly wizardService;
    private readonly logger;
    constructor(wizardService: WizardService);
    sendMessage(chatId: number, message: string): Promise<TelegramBot.Message>;
}
