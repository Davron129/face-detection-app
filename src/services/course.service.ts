import { CourseRepo } from "@/repos/course.repo";
import { SectionAdditionalsRepo } from "@/repos/section-additionals.repo";
import { SectionRepo } from "@/repos/section.repo";
import { Errors, HttpException } from "@/shared/HttpException";

export class CourseService {
    private courseRepo = new CourseRepo();
    private sectionRepo = new SectionRepo();
    private sectionAdditionalsRepo = new SectionAdditionalsRepo();
    
    getCourseContent = async (courseId: string, sectionId: string, userId: string) => {
        const course = await this.courseRepo.getOne(courseId, userId);
        if(!course) {
            throw new HttpException(404, Errors.COURSE_NOT_FOUND, "Data not found")
        }
        
        const sections = await this.sectionRepo.getByCourseId(courseId);
        const section = await this.sectionRepo.getById(sectionId);

        if(!section) {
            throw new HttpException(404, Errors.SECTION_NOT_FOUND, "Data not found")
        }

        const sectionAdditionals = await this.sectionAdditionalsRepo.getBySectionId(sectionId);
        
        return { course, sections, section, sectionAdditionals }
    }
}

export default CourseService