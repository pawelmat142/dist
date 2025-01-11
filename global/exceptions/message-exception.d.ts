import { HttpException } from '@nestjs/common';
export declare class MessageException extends HttpException {
    constructor(message: string);
}
