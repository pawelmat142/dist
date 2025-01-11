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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitService = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("../../artist/artist.service");
const event_service_1 = require("../../event/event.service");
const form_service_1 = require("../../form/form.service");
const illegal_state_exception_1 = require("../../global/exceptions/illegal-state.exception");
const profile_service_1 = require("../../profile/profile.service");
const telegram_service_1 = require("../../telegram/telegram.service");
const bot_util_1 = require("../../telegram/util/bot.util");
const booking_util_1 = require("../util/booking.util");
const checklist_generator_1 = require("../../document/generators/checklist.generator");
let SubmitService = class SubmitService {
    constructor(artistService, formService, profileService, eventService, telegramService) {
        this.artistService = artistService;
        this.formService = formService;
        this.profileService = profileService;
        this.eventService = eventService;
        this.telegramService = telegramService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async submitForm(formId, profile, params) {
        this.logger.log(`[START] submitting form ${formId}`);
        const form = await this.formService.findForm(formId);
        if (!(form === null || form === void 0 ? void 0 : form.data)) {
            throw new common_1.NotFoundException();
        }
        if (!profile) {
            throw new illegal_state_exception_1.IllegalStateException("Missing profile");
        }
        delete form.data.type;
        const booking = {
            formId: form.id,
            promoterUid: profile.uid,
            formData: form.data,
            created: new Date(),
            checklist: checklist_generator_1.ChecklistGenerator.prepareBookingChecklist()
        };
        await this.profileService.updatePromoterInfoWhenSubmitForm(booking.formData, profile);
        await this.formService.submitForm(formId);
        const ctx = {
            booking,
            profile,
        };
        ctx.booking.status = 'SUBMITTED';
        booking_util_1.BookingUtil.addStatusToHistory(ctx.booking, ctx.profile);
        await this.eventService.processBookingForm(ctx, params);
        await this.artistService.processBookingForm(ctx);
        this.logger.log(`[STOP] submitting form ${formId}`);
        return ctx;
    }
    async msgToManagerAboutSubmitedForm(ctx) {
        const telegramChannelId = await this.profileService.findTelegramChannedId(ctx.booking.managerUid);
        if (telegramChannelId) {
            const chatId = Number(telegramChannelId.telegramChannelId);
            if (!isNaN(chatId)) {
                const result = await this.telegramService.sendMessage(chatId, bot_util_1.BotUtil.msgFrom([
                    `New booking form submitted`,
                    `Event: ${ctx.event.name} at ${bot_util_1.BotUtil.formatDate(ctx.event.startDate)}`,
                    `Artist: ${ctx.booking.artists.map(a => a.name).join(', ')}`
                ]));
                if (result) {
                    return;
                }
            }
        }
        this.logger.warn(`Could not send telegram msg to manager ${ctx.booking.managerUid} about booking submitted ${ctx.booking.formId}`);
    }
};
SubmitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [artist_service_1.ArtistService,
        form_service_1.FormService,
        profile_service_1.ProfileService,
        event_service_1.EventService,
        telegram_service_1.TelegramService])
], SubmitService);
exports.SubmitService = SubmitService;
//# sourceMappingURL=submit.service.js.map