"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperUtil = void 0;
const common_1 = require("@nestjs/common");
const role_1 = require("../profile/model/role");
class PaperUtil {
    static agencyString(managerData) {
        return `${managerData.agencyName} / ${managerData.accountAddress} / ${managerData.agencyCountry.name}`;
    }
    static getContentType(filename) {
        const extension = filename.split('.').pop();
        switch (extension) {
            case 'png':
            case 'jpeg':
            case 'jpg': return 'image/jpeg';
            case 'pdf': return 'application/pdf';
        }
        throw new Error(`Unprocessable file extension ${extension}`);
    }
    static addSignaturesData(data, paperSignatures) {
        if (!paperSignatures.length) {
            throw new common_1.BadRequestException(`Signatures missing`);
        }
        paperSignatures.forEach(signature => {
            if (signature.role === role_1.Role.PROMOTER) {
                data.promoterSignature = signature.base64;
            }
            if (signature.role === role_1.Role.MANAGER) {
                data.managerSignature = signature.base64;
            }
            if (signature.role === role_1.Role.ARTIST) {
                data.artistSignature = signature.base64;
            }
        });
    }
    static fileResponse(res, buffer, filename) {
        res.set({
            'Content-Type': PaperUtil.getContentType(filename),
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
    static resolvePaperStatus(paper) {
        var _a, _b, _c, _d;
        const promoterSignature = !!((_b = (_a = paper.signatures) === null || _a === void 0 ? void 0 : _a.find(s => role_1.Role.PROMOTER === s.role)) === null || _b === void 0 ? void 0 : _b.base64);
        if (promoterSignature) {
            const managerSignature = !!((_d = (_c = paper.signatures) === null || _c === void 0 ? void 0 : _c.find(s => role_1.Role.MANAGER === s.role)) === null || _d === void 0 ? void 0 : _d.base64);
            if (managerSignature) {
                return 'VERIFIED';
            }
            return 'SIGNED';
        }
        return 'GENERATED';
    }
}
exports.PaperUtil = PaperUtil;
//# sourceMappingURL=paper-util.js.map