"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistGenerator = void 0;
const role_1 = require("../../profile/model/role");
class ChecklistGenerator {
    static prepareBookingChecklist() {
        return [
            ChecklistGenerator.prepareContract(),
            ChecklistGenerator.prepareTechRider(),
            ChecklistGenerator.prepareSpotProof()
        ];
    }
    static prepareContract() {
        return {
            name: 'Contract',
            template: 'contract',
            steps: [
                this.generateStep(),
                this.signStep(),
                this.verifyAndSignStep(),
            ]
        };
    }
    static prepareTechRider() {
        return {
            name: 'Tech rider',
            template: 'tech-rider',
            steps: [this.generateStep()]
        };
    }
    static prepareSpotProof() {
        return {
            name: 'Rental agreement',
            template: 'rental-proof',
            subName: "Legal issues of event's spot",
            steps: [
                this.uploadStep(),
                this.verifyStep(),
            ]
        };
    }
    static generateStep() {
        return {
            type: 'generate',
            forRoles: [role_1.Role.PROMOTER],
        };
    }
    static signStep() {
        return {
            type: 'sign',
            forRoles: [role_1.Role.PROMOTER],
        };
    }
    static verifyAndSignStep() {
        return {
            type: 'verifyAndSign',
            forRoles: [role_1.Role.MANAGER]
        };
    }
    static uploadStep() {
        return {
            type: 'upload',
            forRoles: [role_1.Role.PROMOTER]
        };
    }
    static verifyStep() {
        return {
            type: 'verify',
            forRoles: [role_1.Role.MANAGER]
        };
    }
}
exports.ChecklistGenerator = ChecklistGenerator;
//# sourceMappingURL=checklist.generator.js.map