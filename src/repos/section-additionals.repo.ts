import knexInstance from "@/config/db";
import { Knex } from "knex";

export class SectionAdditionalsRepo {
    knex: Knex;
    table: string;

    constructor() {
        this.knex = knexInstance;
        this.table = 'acca.section_additional'
    }

    getBySectionId = async (sectionId: string) => {
        const query = this.knex
            .select([
                'sa.id',
                'sa.title',
                'sa.description',
                'sa.file_id',
                this.knex.raw("sa.file_json ->> 'name' as file_name")
            ])
            .from(`${this.table} as sa`)
            .where('sa.section_id', sectionId)
            .whereNotNull('sa.is_deleted')

        return query;
    }

}