import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';

const dbURL =
	process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DEV_DATABASE_URL;

if (!dbURL) {
	console.log('DB URL:', dbURL, 'env:', process.env.NODE_ENV);
	throw new Error('DATABASE_URL is not set');
}

const db = drizzle({ connection: { uri: dbURL } });

export { db };
