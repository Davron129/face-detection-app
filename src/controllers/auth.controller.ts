import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@services/auth.service';
import { LoginDto } from '@dtos/auth.dto';
import { UserRepo } from '@/repos/user.repo';
import { JWT } from '@lib/Jwt';
import sha1 from 'sha1';


class AuthController {
    authService = new AuthService();
    userRepo = new UserRepo();

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: LoginDto = req.body;
            // @ts-ignore
            console.log(req.session.user)

            try {
                const password = sha1(body.password);
                const user = await this.userRepo.getByUsernameAndPassword({
                    ...body,
                    password
                });

                if(!user) {
                    res.render("login", {
                        message: "Invalid credentials."
                    })
                }
                
                // @ts-ignore
                req.session.user = user;
                // @ts-ignore
                console.log(req.session.user)

                const accessToken = JWT.createAccessToken({ userId: user.id });
                res.cookie('accessToken', accessToken).redirect('/home')

            } catch (error) {
                console.log("users", error)
                res.render("login", {
                    message: "Internal server error"
                })
            }
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
