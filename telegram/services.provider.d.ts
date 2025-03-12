import { GoalService } from "src/goal/goal.service";
import { ProfileService } from "src/profile/profile.service";
export declare class ServiceProvider {
    readonly profileService: ProfileService;
    readonly goalService: GoalService;
    constructor(profileService: ProfileService, goalService: GoalService);
}
