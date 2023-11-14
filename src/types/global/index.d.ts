import session from "express-session";

export {}

declare global {
    namespace Express {
        export interface Request {
            reqUser?: string;
        }
    }

    type KeyValueObjectType = { [key: string]: any };
    type ClassType = new () => any;
}

declare module 'express-session' {
    interface SessionData {
        user?: any
    }
}