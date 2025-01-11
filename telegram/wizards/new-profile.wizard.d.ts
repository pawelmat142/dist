import { ServiceProvider } from "./services.provider";
import { Wizard, WizardStep } from "./wizard";
export declare class NewProfileWizard extends Wizard {
    constructor(chatId: number, services: ServiceProvider);
    private profile;
    private error;
    static USDT_MIN_LIMIT: number;
    getSteps(): WizardStep[];
    private selectoRole;
    private createProfile;
}
