import { HttpException } from '@nestjs/common';
export declare class IllegalStateException extends HttpException {
    constructor(msg?: string);
}
