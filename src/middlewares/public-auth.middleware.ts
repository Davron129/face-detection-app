import { UserRepo } from "@/repos/user.repo";
import { JWT } from "@lib/Jwt";
import { Request, Response, NextFunction } from "express";

export const publicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.user) {
            return next()
        }

        if (!req.cookies || !req.cookies.accessToken) {
            return next()
        }

        const { accessToken } = req.cookies;
        const payload = JWT.verifyAccessToken(accessToken);
        if(payload.userId) {
            const userRepo = new UserRepo();
            const user = await userRepo.getById({ id: payload.userId });
            if(user) {
                console.log("user bor")
                req.session.user = user;
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}