import { Credentials } from '../../profile/profile.service';
export declare abstract class TelegramUtil {
    static idByTelegram(telegramChannelId: string): string;
    static loginToken(): string;
    static pin(): string;
    static prepareCredentials(telegramChannelId: string): Credentials;
    private static emailByTelegram;
    private static passwordByTelegram;
}
