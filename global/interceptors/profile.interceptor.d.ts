import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppJwtService } from '../../profile/auth/app-jwt.service';
export declare class ProfileInterceptor implements NestInterceptor {
    private readonly jwtService;
    constructor(jwtService: AppJwtService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
