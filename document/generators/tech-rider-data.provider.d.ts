import { ProfileService } from "../../profile/profile.service";
import { BookingContext } from "../../booking/model/interfaces";
export declare class TechRiderDataProvider {
    private readonly profileService;
    constructor(profileService: ProfileService);
    prepareData(ctx: BookingContext): Promise<any>;
}
