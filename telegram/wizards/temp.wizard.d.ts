import { Profile } from "src/profile/profile.model";
import { ServiceProvider } from "../services.provider";
import { WizardStep } from "./wizard";
import { ProfileWizard } from "./profile.wizard";
export declare class TempWizard extends ProfileWizard {
    private readonly START;
    private readonly ERROR;
    constructor(profile: Profile, services: ServiceProvider);
    getSteps(): WizardStep[];
}
