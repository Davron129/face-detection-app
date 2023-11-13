import KnexService from "@/config/db";
import { LoginDto } from "@/dtos/auth.dto";
import { Knex } from "knex";

export class UserRepo {
    knex: Knex;
    table: string;

    constructor() {
        this.knex = new KnexService().instance;
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
}

