import { ServiceProvider } from './wizards/services.provider';
import TelegramBot = require("node-telegram-bot-api");
export declare class WizardService {
    private readonly servicesProvider;
    private readonly logger;
    private readonly wizards$;
    private readonly bot;
    private lastMessageWithButtonsId;
    constructor(servicesProvider: ServiceProvider);
    private initBot;
    onModuleInit(): void;
    lastMsgIdPerTelegram: Map<number, number>;
    sendMessage(chatId: number, message: string, options?: TelegramBot.SendMessageOptions): Promise<TelegramBot.Message>;
    cleanMessages(telegramChannelId: string): Promise<void>;
    private onBotMessage;
    onBotButton(message: TelegramBot.CallbackQuery): Promise<void>;
    private findOrCreateWizard;
    showTyping(chatId: number): Promise<boolean>;
    private startNewWizard;
    private findWizard;
    private prepareWizard;
    private stopWizard;
    private deactivateExpiredWizards;
    private removeCallbackButtons;
    private sendWizardMessage;
    removeChatButtons(chatId: number, messageId: number, buttons: TelegramBot.InlineKeyboardButton[][]): Promise<boolean | TelegramBot.Message>;
    private switchWizard;
    private selectSWitchWizard;
    private wizardLog;
}