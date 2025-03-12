export declare abstract class DateUtil {
    static isToday(date?: Date): boolean;
    static isSameWeek(date1: Date, date2: Date): boolean;
    static isSameMonth(date1: Date, date2: Date): boolean;
    static get now(): Date;
    static toLocalDate(date: Date): Date;
    static fromLocalDate(date: Date): Date;
}
