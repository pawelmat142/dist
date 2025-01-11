export declare abstract class DateUtil {
    static get NOW(): Date;
    static afterDays(days: number): Date;
    static afterMonths(months: number, days?: number): Date;
    static addDays(date: Date, days: number): Date;
    static addMonths(date: Date, months: number, days?: number): Date;
}
