/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { PdfTemplate } from './model/pdf-data';
import { PdfData } from './model/pdf-data.model';
export declare class PdfGeneratorService implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    test(): Promise<Buffer>;
    generate(template: PdfTemplate, pdfData?: PdfData, data?: any): Promise<Buffer>;
    private preparePdfData;
    static selectDefaultPdfDate: any;
    private _generate;
    private preparePlainTemplate;
    private filTemplateWithData;
    private registerCompiler;
    private addCssStyles;
    private templateDirPath;
}
