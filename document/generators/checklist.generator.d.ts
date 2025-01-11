import { ChecklistItem } from "../../booking/model/checklist.interface";
export declare abstract class ChecklistGenerator {
    static prepareBookingChecklist(): ChecklistItem[];
    static prepareContract(): ChecklistItem;
    static prepareTechRider(): ChecklistItem;
    static prepareSpotProof(): ChecklistItem;
    private static generateStep;
    private static signStep;
    private static verifyAndSignStep;
    private static uploadStep;
    private static verifyStep;
}
