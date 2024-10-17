import { db } from '$lib/server/db/index';
import { tasks } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

import { rateLimit } from '$lib/server/ratelimiter';

export const load: PageServerLoad = async () => {
	const allTasks = await db.select().from(tasks).orderBy(desc(tasks.createdAt));

	return {
		tasks: allTasks
	};
};

export const actions: Actions = {
	addTask: async ({ request }) => {
		const data = await request.formData();
		const task = data.get('task') as string;

		try {
			await db.insert(tasks).values({ task, completed: false });
		} catch (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true };
	},

	toggleTask: async ({ request }) => {
		const { success } = rateLimit(request.headers.get('x-forwarded-for') || 'unknown');

		if (!success) {
			return { success: false };
		}

		const data = await request.formData();

		const id = data.get('id') as string;
		const IntId = parseInt(id);

		const isCompleted = data.get('completionState') === 'true';

		try {
			await db.update(tasks).set({ completed: isCompleted }).where(eq(tasks.id, IntId));
		} catch (error) {
			console.error(error);

			return { success: false };
		}

		return { success: true };
	},

	deleteTask: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const IntId = parseInt(id);

		try {
			await db.delete(tasks).where(eq(tasks.id, IntId));
		} catch (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true };
	}
} satisfies Actions;
