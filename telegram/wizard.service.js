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
var WizardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizardService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const wiz_btn_1 = require("./util/wiz-btn");
const bot_util_1 = require("./util/bot.util");
const schedule_1 = require("@nestjs/schedule");
const profile_wizard_1 = require("./wizards/profile.wizard");
const services_provider_1 = require("./services.provider");
const new_profile_wizard_1 = require("./wizards/new-profile.wizard");
const TelegramBot = require("node-telegram-bot-api");
const create_goal_wizard_1 = require("./wizards/create-goal.wizard");
const start_wizard_1 = require("./wizards/start.wizard");
const edit_goal_wizard_1 = require("./wizards/edit-goal.wizard");
let WizardService = WizardService_1 = class WizardService {
    constructor(servicesProvider) {
        this.servicesProvider = servicesProvider;
        this.logger = new common_1.Logger(WizardService_1.name);
        this.wizards$ = new rxjs_1.BehaviorSubject([]);
        this.bot = this.initBot();
        this.lastMessageWithButtonsId = {};
        this.lastMsgIdPerTelegram = new Map();
    }
    initBot() {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token || process.env.SKIP_TELEGRAM === 'true') {
            this.logger.warn('[SKIP] Initializing telegram bot');
            return undefined;
        }
        else {
            this.logger.log('TELEGRAM BOT INITIALIZATION');
            return new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
        }
    }
    onModuleInit() {
        if (process.env.SKIP_TELEGRAM !== 'true') {
            this.bot.on('message', (message) => this.onBotMessage(message));
            this.bot.on('callback_query', (callback) => this.onBotButton(callback));
        }
    }
    async sendMessage(chatId, message, options) {
        var _a;
        const result = await ((_a = this.bot) === null || _a === void 0 ? void 0 : _a.sendMessage(chatId, message, options));
        this.lastMsgIdPerTelegram.set(chatId, result.message_id);
        return result;
    }
    async cleanMessages(telegramChannelId) {
        const msgId = this.lastMsgIdPerTelegram.get(Number(telegramChannelId));
        if (msgId) {
            for (let i = 0; i < 50; i++) {
                this.bot.deleteMessage(Number(telegramChannelId), msgId - i).catch(er => { return; });
            }
            this.logger.log('Chat cleaned successfully');
        }
    }
    async onBotMessage(message) {
        const chatId = message.chat.id;
        if (!chatId) {
            this.logger.error('Chat id not found');
            return;
        }
        const input = message.text;
        if (!input) {
            return;
        }
        let wizard = await this.findOrCreateWizard(chatId);
        let step = wizard.getStep();
        if (wizard.keyboardTexts.includes(input)) {
            wizard.keyboardTexts = [];
            const clickedButton = step.keyboard.flat().find(b => b.text === input);
            if (clickedButton) {
                wizard = await this.resolveNextStepWizardByButton(clickedButton, wizard);
            }
        }
        if (step.process) {
            const order = await step.process(input);
            wizard.order = order;
        }
        wizard.msgId = message.message_id;
        this.sendWizardMessage(wizard, input);
    }
    async onBotButton(message) {
        const chatId = message.from.id;
        if (!chatId) {
            this.logger.error('Chat id not found');
            return;
        }
        let input = message.data;
        if (!input || input === wiz_btn_1.WizBtn.AVOID_BUTTON_CALLBACK) {
            return;
        }
        let wizard = await this.findOrCreateWizard(chatId);
        let step = wizard.getStep();
        const clickedButton = bot_util_1.BotUtil.findClickedButton(step, message.data);
        await this.removeCallbackButtons(message);
        if (clickedButton) {
            wizard = await this.resolveNextStepWizardByButton(clickedButton, wizard);
        }
        wizard.msgId = message.message.message_id;
        this.sendWizardMessage(wizard, input);
    }
    async resolveNextStepWizardByButton(clickedButton, wizard) {
        if (clickedButton.switch) {
            this.stopWizard(wizard);
            wizard = this.switchWizard(clickedButton.switch, wizard);
            await wizard.init();
        }
        else if (clickedButton.process) {
            this.wizardLog(wizard, `processing...`);
            const order = await clickedButton.process();
            wizard.order = order;
        }
        return wizard;
    }
    async findOrCreateWizard(chatId) {
        this.showTyping(chatId);
        let wizard = this.findWizard(chatId);
        if (!wizard) {
            wizard = await this.prepareWizard(chatId);
        }
        wizard.modified = new Date();
        return wizard;
    }
    async showTyping(chatId) {
        var _a;
        return (_a = this.bot) === null || _a === void 0 ? void 0 : _a.sendChatAction(chatId, 'typing');
    }
    async startNewWizard(chatId) {
        let wizard = await this.findOrCreateWizard(chatId);
        this.sendWizardMessage(wizard, '');
    }
    findWizard(chatId) {
        return this.wizards$.value.find(w => w.chatId === chatId);
    }
    async prepareWizard(chatId) {
        const telegramChannelId = chatId.toString();
        const profile = await this.servicesProvider.profileService.findByTelegram(telegramChannelId);
        const wizard = profile
            ? new start_wizard_1.StartWizard(profile, this.servicesProvider)
            : new new_profile_wizard_1.NewProfileWizard(chatId, this.servicesProvider);
        await wizard.init();
        const wizards = this.wizards$.value;
        wizards.push(wizard);
        this.wizards$.next(wizards);
        return wizard;
    }
    stopWizard(wizard) {
        this.cleanMessages(wizard.chatId.toString());
        const wizards = this.wizards$.value.filter(w => w.chatId !== wizard.chatId);
        this.wizards$.next(wizards);
        this.wizardLog(wizard, `stopped`);
    }
    async deactivateExpiredWizards() {
        const expiredWizardChatIds = this.wizards$.value
            .filter(bot_util_1.BotUtil.isExpired).map(w => w.chatId);
        const wizards = this.wizards$.value
            .filter(w => !expiredWizardChatIds.includes(w.chatId));
        this.wizards$.next(wizards);
        expiredWizardChatIds.forEach(chatId => this.sendMessage(chatId, 'Dialog expired!'));
    }
    removeCallbackButtons(callback) {
        const chatId = callback.from.id;
        const msgIdToRemoveButtons = this.lastMessageWithButtonsId[chatId];
        if (!msgIdToRemoveButtons)
            return;
        const buttons = callback.message.reply_markup.inline_keyboard;
        const newButtons = [];
        buttons.forEach(btns => {
            btns.forEach(btn => {
                if (btn.callback_data === callback.data) {
                    btn.callback_data = wiz_btn_1.WizBtn.AVOID_BUTTON_CALLBACK;
                    newButtons.push([btn]);
                }
            });
        });
        return this.removeChatButtons(chatId, this.lastMessageWithButtonsId[chatId], newButtons);
    }
    async sendWizardMessage(wizard, _input) {
        const input = _input.toLowerCase();
        let step = wizard.getStep();
        let msg = step.message;
        if (!isNaN(step.nextOrder)) {
            wizard.order = step.nextOrder;
            step = wizard.getStep();
            msg.push('', ...step.message);
        }
        bot_util_1.BotUtil.addBackBtnIfNeeded(step);
        if (step.close || input === wiz_btn_1.WizBtn.STOP) {
            if (input === wiz_btn_1.WizBtn.STOP) {
                msg = ['Dialog interrupted'];
            }
            delete step.buttons;
            this.stopWizard(wizard);
        }
        let buttons = step.buttons || [];
        let keyboard = step.keyboard || [];
        const options = {};
        if (buttons.length) {
            options.reply_markup = {
                one_time_keyboard: true,
                inline_keyboard: buttons.map(btns => btns.map(btn => {
                    if (btn.url && btn.process) {
                        btn.process();
                    }
                    if (!btn.callback_data) {
                        btn.callback_data = btn.text;
                    }
                    return btn;
                })),
            };
        }
        else if (keyboard.length) {
            options.reply_markup = {
                one_time_keyboard: true,
                keyboard: keyboard.map(btns => btns.map(btn => {
                    wizard.keyboardTexts.push(btn.text);
                    return btn;
                }))
            };
        }
        if (!msg.length) {
            this.logger.warn(`empty message`);
            return;
        }
        const result = await this.sendMessage(wizard.chatId, bot_util_1.BotUtil.msgFrom(msg), options);
        this.wizardLog(wizard, `message sent`);
        if (buttons.length) {
            this.lastMessageWithButtonsId[result.chat.id] = result.message_id;
        }
        if (step.close) {
        }
    }
    removeChatButtons(chatId, messageId, buttons) {
        if (!messageId)
            return;
        return this.bot.editMessageReplyMarkup({
            inline_keyboard: buttons !== null && buttons !== void 0 ? buttons : []
        }, {
            chat_id: chatId,
            message_id: messageId
        });
    }
    switchWizard(name, currentWizard) {
        const wizard = this.selectSWitchWizard(name, currentWizard);
        const wizards = this.wizards$.value.filter(w => w.chatId === currentWizard.chatId);
        wizards.push(wizard);
        this.wizards$.next(wizards);
        return wizard;
    }
    selectSWitchWizard(name, currentWizard) {
        switch (name) {
            case profile_wizard_1.ProfileWizard.name:
                return new profile_wizard_1.ProfileWizard(currentWizard.getProfile(), this.servicesProvider);
            case create_goal_wizard_1.CreateGoalWizard.name:
                return new create_goal_wizard_1.CreateGoalWizard(currentWizard.getProfile(), this.servicesProvider);
            case edit_goal_wizard_1.EditGoalWizard.name:
                return new edit_goal_wizard_1.EditGoalWizard(currentWizard.getProfile(), this.servicesProvider);
            default:
                return new start_wizard_1.StartWizard(currentWizard.getProfile(), this.servicesProvider);
        }
    }
    wizardLog(wizard, log) {
        const unitIdentifierLog = wizard instanceof profile_wizard_1.ProfileWizard ? ` [${wizard.getProfile().telegramChannelId}]` : '';
        this.logger.log(`[${wizard.constructor.name}]${unitIdentifierLog} step ${wizard.order}, chatId: ${wizard.chatId} - ${log}`);
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WizardService.prototype, "deactivateExpiredWizards", null);
WizardService = WizardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_provider_1.ServiceProvider])
], WizardService);
exports.WizardService = WizardService;
//# sourceMappingURL=wizard.service.js.map