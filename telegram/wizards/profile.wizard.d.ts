import { Profile } from "src/profile/profile.model";
import { ServiceProvider } from "../services.provider";
import { Wizard, WizardStep } from "./wizard";
import { Goal } from "src/goal/model/goal.model";
export declare class ProfileWizard extends Wizard {
    protected profile: Profile;
    constructor(profile: Profile, services: ServiceProvider);
    protected error: any;
    protected selectedGoal?: Goal;
    getProfile(): Profile;
    getSteps(): WizardStep[];
    private deleteAccount;
}
