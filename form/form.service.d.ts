import { Form } from "./form.model";
import { Model } from "mongoose";
export declare class FormService {
    private formModel;
    private readonly logger;
    constructor(formModel: Model<Form>);
    findForm(id: string): Promise<Form>;
    startForm(formType: string, data: any): Promise<{
        formId: string;
    }>;
    submitForm(id: string): Promise<void>;
    generateFormId(formType: string): string;
}
