import { Profile } from "src/profile/profile.model";
import { ServiceProvider } from "../services.provider";
import { WizardStep } from "./wizard";
import { ProfileWizard } from "./profile.wizard";
export declare class EditGoalWizard extends ProfileWizard {
    private readonly START;
    private readonly ERROR;
    private readonly SELECTED;
    private readonly NOTIFICATIONS_UPDATED;
    private readonly CHANGE_NAME;
    private readonly NAME_CHANGED;
    private readonly DELETE;
    private readonly DELETED;
    private readonly PAUSED;
    constructor(profile: Profile, services: ServiceProvider);
    private goals;
    protected _init: () => Promise<void>;
    getSteps(): WizardStep[];
    private listGoalsButtons;
    private editOptionsButtons;
    private updateEnableNotifications;
    private pause;
    private updadeGoal;
    private changeNameProcess;
    private deleteGoal;
}
