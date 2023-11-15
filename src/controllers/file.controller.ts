import { Request, Response } from 'express';
import { FileService } from "@/services/file.service"
import path from 'path';
import fs from 'fs';

export class FileController {
    private fileService = new FileService();
    
    download = async(req: Request, res: Response) => {
        try {
            const { file_id } = req.params;

            const file = this.fileService.getById(file_id)
            const filePath = await this.fileService.getFileName(file);

            return res.sendFile(String(filePath), (err) => {
                if(err) {
                    return res.status(404).json({
                        message: "File Not Found"
                    })
                }
            });
        } catch (error) {
            return res.status(404).json({
                message: "File Not Found"
            })
        }
    }

    streamVideo = async (req: Request, res: Response) => { 
        const file_id = req.params.file_id;
        const file = this.fileService.getById(file_id);

        const filename = await this.fileService.getFileName(file);

        const range = req.headers.range 
        const videoPath = path.join(process.cwd(), 'uploads', String(filename)); 
        const videoSize = fs.statSync(videoPath).size 

        if(range) {
            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : videoSize - 1;

            const contentLength = end - start + 1; 

            const headers = { 
                "Content-Range": `bytes ${start}-${end}/${videoSize}`, 
                "Accept-Ranges": "bytes", 
                "Content-Length": contentLength, 
                "Content-Type": "video/mp4"
            } 

            res.writeHead(206, headers) 
            const stream = fs.createReadStream(videoPath, { 
                start, 
                end 
            }) 
            stream.pipe(res) 
        } else {
            const head = {
                'Content-Length': videoSize,
                'Content-Type': 'video/mp4',
            };
                
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    }
}