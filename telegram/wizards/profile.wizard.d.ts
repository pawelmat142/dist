import { Profile } from "../../profile/model/profile.model";
import { ServiceProvider } from "./services.provider";
import { Wizard, WizardStep } from "./wizard";
export declare class ProfileWizard extends Wizard {
    protected profile: Profile;
    constructor(profile: Profile, services: ServiceProvider);
    private error;
    getProfile(): Profile;
    getSteps(): WizardStep[];
    private deleteAccount;
}
