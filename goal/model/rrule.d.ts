export type FREQ = '' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export declare const bday: readonly ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
export type BDAY = typeof bday[number];
export declare const bdayMap: {
    [key in BDAY]: string;
};
export declare const bymonthday: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
export type BYMONTHDAY = typeof bymonthday[number];
export declare const byhour: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
export type BYHOUR = typeof byhour[number];
export declare const byminute: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
export type BYMINUTE = typeof byminute[number];
export interface RRuleI {
    FREQ: FREQ;
    INTERVAL?: number;
    BDAY?: BDAY;
    BYMONTHDAY?: BYMONTHDAY;
    BYHOUR?: BYHOUR;
    BYMINUTE?: BYMINUTE;
}
export declare class RRule {
    private static readonly DEFAULT_BYHOUR;
    private static readonly DEFAULT_BYMINUTE;
    FREQ: FREQ;
    INTERVAL?: number;
    BDAY?: BDAY;
    BYMONTHDAY?: BYMONTHDAY;
    BYHOUR?: BYHOUR;
    BYMINUTE?: BYMINUTE;
    constructor(rrule: RRuleI);
    toMsg(): string;
    toString(): string;
    static from(rruleStr: string): RRule;
    setRRuleDefaultValues(): RRule;
}
