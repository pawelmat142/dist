/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Form } from './form.model';
import { Model } from 'mongoose';
import { FormService } from './form.service';
export declare class FormController {
    private formModel;
    private readonly formService;
    private readonly logger;
    constructor(formModel: Model<Form>, formService: FormService);
    fetchSubmitted(formType: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Form> & Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Form> & Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Form, "find", {}>;
    openForm(id: string): Promise<import("mongoose").Document<unknown, {}, Form> & Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    startForm(formType: string, data: any): Promise<{
        formId: string;
    }>;
    storeForm(id: string, data: any): Promise<void>;
    submitForm(id: string, data: any): Promise<void>;
}
