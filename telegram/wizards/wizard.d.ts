import { Logger } from "@nestjs/common";
import { ServiceProvider } from "../services.provider";
export interface WizardResponse {
    chatId: number;
    order?: number;
    message?: string[];
    buttons?: WizardButton[][];
}
export interface WizardStep {
    order: number;
    message?: string[];
    close?: boolean;
    switch?: string;
    buttons?: WizardButton[][];
    keyboard?: WizardButton[][];
    process?: (input: string) => Promise<number>;
    nextOrder?: number;
    backButton?: boolean;
}
export interface WizardButton {
    text: string;
    callback_data?: string;
    switch?: string;
    url?: string;
    process?(): Promise<number>;
}
export declare class Wizard {
    protected readonly services: ServiceProvider;
    protected readonly logger: Logger;
    chatId: number;
    order: number;
    modified: Date;
    msgId: number;
    keyboardTexts: string[];
    constructor(chatId: number, services: ServiceProvider);
    getSteps(): WizardStep[];
    private initialized;
    getStep(): WizardStep;
    init: () => Promise<void>;
    protected _init: () => Promise<void>;
    protected toStep: (order: number) => () => Promise<number>;
}
