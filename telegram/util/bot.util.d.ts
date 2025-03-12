import { Wizard, WizardButton, WizardStep } from "../wizards/wizard";
export declare abstract class BotUtil {
    static backBtn(): WizardButton;
    static swwStep(): WizardStep;
    static msgFrom: (lines: string[]) => string;
    static readonly WiZARD_EXPIRATION_MINUTES = 15;
    static isExpired: (wizard: Wizard) => boolean;
    static getRandomInt: (min: number, max: number) => number;
    static findClickedButton: (step: WizardStep, callbackData: string) => WizardButton;
    static addBackBtnIfNeeded: (step: WizardStep) => void;
    static addBackBtn: (step: WizardStep) => void;
    static formatDate(date: Date): string;
}
