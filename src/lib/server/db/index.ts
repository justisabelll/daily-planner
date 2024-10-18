import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';

const dbURL = import.meta.env.PROD
	? import.meta.env.DATABASE_URL
	: import.meta.env.DEV_DATABASE_URL;

if (!dbURL) {
	console.log('DB URL:', dbURL, 'env:', import.meta.env.PROD);
	throw new Error('DATABASE_URL is not set');
}

const db = drizzle({ connection: { uri: dbURL } });

export { db };
