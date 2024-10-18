import { db } from '$lib/server/db/index';
import { tasks } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

import { rateLimit } from '$lib/server/ratelimiter';
import type { Cookies } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	let user = cookies.get('user');
	let timeStamp = cookies.get('user_timestamp');

	if (!user || !timeStamp) {
		user = crypto.randomUUID();
		timeStamp = Date.now().toString();
		setUserCookies(cookies, user, timeStamp);
	} else {
		// Convert stored timestamp to number for comparison
		const storedTime = parseInt(timeStamp);
		const currentTime = Date.now();

		// Check if more than 24 hours have passed
		if (currentTime - storedTime > 24 * 60 * 60 * 1000) {
			await db.delete(tasks).where(eq(tasks.userId, user));
			timeStamp = currentTime.toString();
			setUserCookies(cookies, user, timeStamp);
		}
	}

	const allTasks = await db
		.select()
		.from(tasks)
		.where(and(eq(tasks.userId, user), eq(tasks.completed, false)))
		.orderBy(desc(tasks.createdAt));

	return {
		tasks: allTasks,
		user
	};
};

function setUserCookies(cookies: Cookies, user: string, timeStamp: string) {
	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
		path: '/'
	};

	cookies.set('user', user, cookieOptions);
	cookies.set('user_timestamp', timeStamp, cookieOptions);
}

export const actions: Actions = {
	addTask: async ({ request, cookies }) => {
		const user = cookies.get('user');
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
		const user = cookies.get('user');
		const { success } = rateLimit(request.headers.get('x-forwarded-for') || 'unknown');

		if (!success) {
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
		const user = cookies.get('user');
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
