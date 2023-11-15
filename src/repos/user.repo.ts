import knexInstance from "@/config/db";
import { LoginDto } from "@/dtos/auth.dto";
import { Knex } from "knex";

export class UserRepo {
    knex: Knex;
    table: string;

    constructor() {
        this.knex = knexInstance
        this.table = "acca.users";
    }

    getAll = async () => {
        const query = this.knex
            .select("*")
            .from(this.table);
        
        return query
    }

    getByUsernameAndPassword = async ({ username, password }: LoginDto) => {
        const query = this.knex
            .select("*")
            .from(this.table)
            .where("username", username)
            .andWhere("password", password)
            .first()

        return query
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

