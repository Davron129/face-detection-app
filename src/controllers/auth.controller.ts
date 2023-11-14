import { Request, Response } from 'express';
import { LoginDto } from '@dtos/auth.dto';
import { UserRepo } from '@/repos/user.repo';
import { JWT } from '@lib/Jwt';
import sha1 from 'sha1';

class AuthController {
    userRepo = new UserRepo();

    login = async (req: Request, res: Response) => {
            try {
                const body: LoginDto = req.body;
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
                
                req.session.user = user;

                req.session.save((e) => {
                    if(e) return res.render("login", {
                        message: "Internal server error"
                    });

                    const accessToken = JWT.createAccessToken({ userId: user.id });
                    res.cookie("accessToken", accessToken, { maxAge: 24 * 60 * 60 * 1000 });
                    res.redirect('/home');
                });


            } catch (error) {
                console.log("users", error)
                res.render("login", {
                    message: "Internal server error"
                })
            }
    };
}

export default AuthController;
