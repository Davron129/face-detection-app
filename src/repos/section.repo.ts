import KnexService from "@/config/db";
import { Knex } from "knex";

export class SectionRepo {
    knex: Knex;
    table: string;

    constructor() {
        this.knex = new KnexService().instance;
        this.table = 'acca.sections'
    }

    getByCourseId = async (courseId: string) => {
        const query = this.knex
            .select([
                's.id',
                's.title',
                's.description'
            ])
            .from(`${this.table} as s`)
            .where('s.course_id', courseId)
            .whereNotNull('s.is_deleted')
            .orderBy('s.created_at')

        return query;
    }

}