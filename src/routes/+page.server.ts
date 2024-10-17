import { db } from '$lib/server/db/index';
import { tasks } from '$lib/server/db/schema';

import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {

    const allTasks = await db.select().from(tasks)

	return {
		tasks: allTasks
	};
};
