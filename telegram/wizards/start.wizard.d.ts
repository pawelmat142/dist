import { Profile } from "src/profile/profile.model";
import { ServiceProvider } from "../services.provider";
import { WizardStep } from "./wizard";
import { ProfileWizard } from "./profile.wizard";
export declare class StartWizard extends ProfileWizard {
    private readonly START;
    private readonly ERROR;
    private readonly OTHER_GOALS;
    constructor(profile: Profile, services: ServiceProvider);
    private goals;
    protected _init: () => Promise<void>;
    getSteps(): WizardStep[];
    private dailyGoalButtons;
    private otherGoalButtons;
    private markGoalReady;
    private dailyGoalButtonText;
    private otherGoalButtonText;
    private prepareList;
}
