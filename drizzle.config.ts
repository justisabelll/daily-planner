import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const dbURL =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL;

if (!dbURL) {
  throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
  out: 'src/lib/server/db',
  schema: 'src/lib/server/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: dbURL,
  },
});
