import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbURL = import.meta.env.PROD
	? import.meta.env.DATABASE_URL
	: import.meta.env.DEV_DATABASE_URL;

if (!dbURL) {
	throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
	out: 'src/lib/server/db',
	schema: 'src/lib/server/db/schema.ts',
	dialect: 'mysql',
	dbCredentials: {
		url: dbURL,
		database: 'mysql'
	}
});
