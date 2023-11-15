import CourseController from '@/controllers/course.controller';
import { publicAuthMiddleware } from '@/middlewares/public-auth.middleware';
import { Router, Request, Response } from 'express';

class ClientRoute {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/login', (req: Request, res: Response) => {
            console.log("req.session.user", req.session)
            res.render("login")
        });

        this.router.get("/", publicAuthMiddleware, (req: Request, res: Response) => {
            const user = req.session.user ?? null;
            
            res.render('home', { user })
        })

        this.router.get("/courses", publicAuthMiddleware, new CourseController().getAll)

        this.router.get("/courses/:courseId", publicAuthMiddleware, new CourseController().getOne)

        this.router.get("/courses/:courseId/:sectionId", publicAuthMiddleware, new CourseController().view)
    }
}

export default ClientRoute;
