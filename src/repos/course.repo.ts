import KnexService from "@/config/db";
import { Knex } from "knex";

export class CourseRepo {
    knex: Knex;
    table: string;

    constructor() {
        this.knex = new KnexService().instance;
        this.table = 'acca.courses'
    }

    getAll = async (userId: string) => {
        const query = this.knex
            .select([
                'ct.name', 
                'ct.id', 
                'ct.created_at', 
                this.knex.raw(`json_agg(json_build_object(
                    'id', c.id,
                    'title', c.title,
                    'description', c.description,
                    'is_permitted', case when pc.user_id = '${userId}' then true else false end
                    )) AS courses`)
                ])
            .from("acca.course_types as ct")
            .leftJoin('acca.courses as c', 'ct.id', 'c.course_type_id')
            .leftJoin('acca.permitted_courses as pc', 'c.id', 'pc.course_id')
            .whereNotNull('c.is_deleted')
            .whereNotNull('ct.is_deleted')
            .groupBy('ct.id')
            .orderBy('ct.created_at')

        return query
    }
    
    getOne = async (courseId: string, userId: string) => {
        const query = this.knex
            .select([
                'c.id',
                'c.title',
                'c.description',
                this.knex.raw(`c.course_type_json ->> 'name' as course_type`),
                this.knex.raw(`case when pc.user_id = '${userId}' and pc.is_deleted is not null then true else false end as is_permitted`)
            ])
            .from(`${this.table} as c`)
            .leftJoin('acca.permitted_courses as pc', 'c.id', 'pc.course_id')
            .where("c.id", courseId)
            .whereNotNull("c.is_deleted")
            .first()

        return query
    }
}