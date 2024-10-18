import { db } from '$lib/server/db/index';
import { tasks } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

import { rateLimit } from '$lib/server/ratelimiter';
import { getSession, updateSession } from '$lib/server/session';
import toast from 'svelte-french-toast';

export const load: PageServerLoad = async ({ cookies }) => {
	const { user, timestamp } = await getSession(cookies);

	// Convert stored timestamp to number for comparison
	const storedTime = parseInt(timestamp);
	const currentTime = Date.now();

	// Check if more than 24 hours have passed
	if (currentTime - storedTime > 24 * 60 * 60 * 1000) {
		await db.delete(tasks).where(eq(tasks.userId, user));
		const newTimeStamp = currentTime.toString();

		// Update the session with the new timestamp
		await updateSession(cookies, { data: { user, timestamp: newTimeStamp } });
	}

	const allTasks = await db
		.select()
		.from(tasks)
		.where(and(eq(tasks.userId, user)))
		.orderBy(desc(tasks.createdAt));

	return {
		tasks: allTasks,
		user
	};
};

export const actions: Actions = {
	addTask: async ({ request, cookies }) => {
		const { user } = await getSession(cookies);
		const { success } = await rateLimit(request.headers.get('x-forwarded-for') || 'unknown');

		if (!success) {
			return { success: false };
		}

		const data = await request.formData();
		const task = data.get('task') as string;

		try {
			await db.insert(tasks).values({ userId: user!, task, completed: false });
		} catch (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true };
	},

	toggleTask: async ({ request, cookies }) => {
		const { user } = await getSession(cookies);
		const { success } = await rateLimit(request.headers.get('x-forwarded-for') || 'unknown');

		if (!success) {
			toast.error('You have exceeded the rate limit. Please try again later.');
			return { success: false };
		}

		const data = await request.formData();

		const id = data.get('id') as string;
		const IntId = parseInt(id);

		const isCompleted = data.get('completionState') === 'true';

		try {
			await db
				.update(tasks)
				.set({ completed: isCompleted })
				.where(and(eq(tasks.id, IntId), eq(tasks.userId, user!)));
		} catch (error) {
			console.error(error);

			return { success: false };
		}

		return { success: true };
	},

	deleteTask: async ({ request, cookies }) => {
		const { user } = await getSession(cookies);
		const data = await request.formData();
		const id = data.get('id') as string;
		const IntId = parseInt(id);

		try {
			await db.delete(tasks).where(and(eq(tasks.id, IntId), eq(tasks.userId, user!)));
		} catch (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true };
	}
} satisfies Actions;
