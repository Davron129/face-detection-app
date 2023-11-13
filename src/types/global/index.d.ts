export {}

declare global {
    namespace Express {
        export interface Request {
            reqUser?: string;
        }
        export interface SessionData {
            user?: any
        }
    }

    type KeyValueObjectType = { [key: string]: any };
    type ClassType = new () => any;
}
