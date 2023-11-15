import { Request, Response } from 'express';
import { CourseRepo } from "@/repos/course.repo";
import { SectionRepo } from '@/repos/section.repo';
import CourseService from '@/services/course.service';

class CourseController {
    private courseRepo = new CourseRepo();
    private sectionRepo = new SectionRepo();
    private courseService = new CourseService();

    getAll = async (req: Request, res: Response) => {
        try {
            const user = req.session.user
            const courses = await this.courseRepo.getAll(user?.id);
            console.log(courses[0].courses)

            res.render("courses", { courses, user })

        } catch (error) {
            console.log(error)
            res.send("Error")
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const courseId = req.params.courseId;
            const user = req.session.user
            const course = await this.courseRepo.getOne(courseId, user?.id);
            const sections = await this.sectionRepo.getByCourseId(courseId);

            if(course) {
                return res.render("course-content", { user, course, sections })
            } else {
                res.render("course-content", { user, course: {} })
            }

        } catch (error) {
            console.log(error)
            res.send("Error")
        }
    }

    view = async (req: Request, res: Response) => {
        try {
            const { courseId, sectionId } = req.params;
            const user = req.session.user

            const { course, section, sections = [], sectionAdditionals = [] } = await this.courseService.getCourseContent(courseId, sectionId, user.id)

            // permission bo'lmasa permission yo'q deb chiqishi kerak

            if(course && sections && section) {
                return res.render("course-view", { user, course, sections, section, sectionAdditionals })
            } else {
                // ma'lumot topilmadi, kurslar ro'yxatiga o'tish degan narsa qilish kerak
                return res.redirect(`/courses/${courseId}`)
            }

        } catch (error) {
            console.log(error)
            res.send("Error")
        }
    }
}

export default CourseController