import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class LogInterceptor implements NestInterceptor {
    private readonly logger;
    constructor();
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
