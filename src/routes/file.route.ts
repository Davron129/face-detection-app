import validationMiddleware from '@middlewares/validation.middleware';
import AuthController from '@controllers/auth.controller';
import { LoginDto } from '@dtos/auth.dto';
import { Router } from 'express';
import { FileController } from '@/controllers/file.controller';

class FileRoute {
    public router = Router();
    public controller = new FileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/files/:file_id', this.controller.download);

        this.router.get('/static/:file_id', this.controller.download);
    }
}

export default FileRoute;
