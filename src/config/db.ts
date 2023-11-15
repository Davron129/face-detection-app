import knex from "knex";

export class KnexService {
	instance;

	constructor() {
		console.log("Connection")
		this.instance = knex({
			client: 'pg',
			debug: false,
			connection: {
				host: process.env.PGHOST,
				user: process.env.PGUSER,
				database: process.env.PGDATABASE,
				password: process.env.PGPASSWORD,
				port: Number(process.env.PGPORT),
				application_name: `acca-backend ${new Date().getTime()}`,
				timezone: 'Asia/Tashkent',
			},
			pool: {
				min: 1,
				max: Number(process.env.MAX_POOL) || 75,
			},
		});
	}
}

const knexInstance = new KnexService().instance;

export default knexInstance;