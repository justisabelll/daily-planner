import { mysqlTable, varchar, int, datetime, boolean } from 'drizzle-orm/mysql-core';

import { sql } from 'drizzle-orm';

export const tasks = mysqlTable('tasks', {
	id: int('id').primaryKey().notNull().autoincrement(),
	task: varchar('task', { length: 255 }).notNull(),
	completed: boolean('completed').default(false).notNull(),
	createdAt: datetime('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
