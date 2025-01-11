"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const signature_model_1 = require("./signature.model");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const status_1 = require("../global/status");
let SignatureService = class SignatureService {
    constructor(signatureModel) {
        this.signatureModel = signatureModel;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async listSignatures(uid) {
        const signatures = await this.signatureModel.find({ uid, status: { $eq: status_1.Status.READY } });
        this.logger.log(`Found ${signatures.length} for ${uid}`);
        return signatures;
    }
    async putSignature(dto, profile) {
        if (dto.id) {
            const update = await this.signatureModel.updateOne({
                id: dto.id, uid: profile.uid,
            }, { $set: {
                    base64data: dto.base64data,
                    size: dto.size,
                    modified: new Date()
                } }).exec();
            if (update.modifiedCount) {
                this.logger.log(`Updated signature ${dto.id} by ${profile.uid}`);
                return { id: dto.id };
            }
            else {
                this.logger.warn(`Update signature failed create new...`);
            }
        }
        const newSignature = await this.createSignature(dto, profile);
        return { id: newSignature.id };
    }
    async cancelSignature(id, uid) {
        const update = await this.signatureModel.updateOne({
            id, uid
        }, { $set: {
                status: status_1.Status.CANCELED,
                modified: new Date()
            } });
        if (update.modifiedCount) {
            this.logger.log(`Cancelled signature ${id} by ${uid}`);
        }
        else {
            throw new common_1.NotFoundException(`Not found signature ${id} by ${uid} - trying cancell`);
        }
    }
    async createSignature(dto, profile) {
        const signature = new this.signatureModel({
            id: (0, uuid_1.v4)(),
            uid: profile.uid,
            status: status_1.Status.READY,
            created: new Date(),
            base64data: dto.base64data,
            size: dto.size
        });
        const saved = await signature.save();
        this.logger.log(`Creared new signature ${saved.id} by ${signature.uid}`);
        return saved;
    }
    async fetch(id, uid) {
        const signature = await this.signatureModel.findOne({ id, uid });
        if (!signature) {
            throw new common_1.UnauthorizedException(`Not found Signature ${id} for user ${uid}`);
        }
        return signature;
    }
};
SignatureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(signature_model_1.Signature.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SignatureService);
exports.SignatureService = SignatureService;
//# sourceMappingURL=signature.service.js.map