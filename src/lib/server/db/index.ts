import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL, DEV_DATABASE_URL } from '$env/static/private';

const dbURL = import.meta.env.PROD ? DATABASE_URL : DEV_DATABASE_URL;

if (!dbURL) {
	console.log('DB URL:', dbURL, 'env:', import.meta.env.PROD);
	throw new Error('DATABASE_URL is not set');
}

const db = drizzle({
	connection: { uri: dbURL, database: 'mysql' }
});

export { db };
