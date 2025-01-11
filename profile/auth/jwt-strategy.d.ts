export interface JwtPayload {
    uid: string;
    name: string;
    telegramChannelId: string;
    roles: string[];
    exp: number;
    iat: number;
    artistSignature?: string;
}
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
}
export {};
