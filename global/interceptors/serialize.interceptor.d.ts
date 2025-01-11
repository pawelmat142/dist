import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClassTransformOptions } from 'class-transformer';
interface ClassConstructor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: ClassConstructor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: ClassConstructor);
    options: ClassTransformOptions;
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
export declare class SerializeBookingDto implements NestInterceptor {
    options: ClassTransformOptions;
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
    private serializeBooking;
}
export {};
