import { FileRepo } from "@/repos/file.repo"
import { Errors, HttpException } from "@/shared/HttpException";
import path from "path";

export class FileService {
    private fileRepo = new FileRepo();

    getFileName = async (file: any) => {
        try {
            const fileExtension = file.name.slice(file.name.lastIndexOf("."));
            const fileName = [file.id, fileExtension].join("");
            const filePath = path.join(process.cwd(), 'uploads', fileName)

            return filePath
        } catch (error) {
            return error
        }
    }

    getById = async (fileId: string) => {
        try {
            const file = await this.fileRepo.getById({ id: fileId });

            if(!file) {
                throw new HttpException(404, Errors.NOT_FOUND)
            }

            return file
        } catch (error) {
            return error
        }
    }

    
}