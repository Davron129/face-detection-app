import knexInstance, { KnexService } from "@/config/db";
import { Knex } from "knex";

export class FileRepo {
    knex: Knex;
    table: string;

    constructor() {
        // this.knex = new KnexService().instance
        this.knex = knexInstance
        this.table = "acca.files";
    }

    getById = async ({ id }: { id: string }) => {
        const query = this.knex
            .select("*")
            .from(this.table)
            .where("id", id)
            .andWhere(this.knex.raw("is_deleted is not true"))
            .first();

        return query;
    }
}

