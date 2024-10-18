import { db } from '$lib/server/db/index';
import { tasks } from '$lib/server/db/schema';

// this script adds test data to the database
// note: tasks won't show up for you right away
// to see them, change your user id to '1' in +page.server.ts
// this is because the user id you get won't be the same
// as the one in the seed file

const seed = async () => {
	let hasTasks = false;
	console.log('Checking if database already has tasks...');

	try {
		hasTasks = (await db.select().from(tasks).limit(1)).length > 0;
	} catch (error) {
		console.error('Error checking if database has tasks, tables might not be created:', error);
		return;
	}

	if (hasTasks) {
		console.log('Database already has tasks, skipping seeding...');
		return;
	}

	console.log('Seeding...');

	await db.insert(tasks).values([
		{ userId: '1', task: 'try ruby on rails' },
		{ userId: '1', task: 'visit french luandry ' },
		{ userId: '1', task: 'buy rick hoodie' },
		{ userId: '1', task: 'vote' },
		{ userId: '1', task: 'watch godfather 2' },
		{ userId: '1', task: 'write blog post about consuming news' }
	]);
};

const reset = async () => {
	console.log('Resetting...');
	await db.delete(tasks);
	console.log('Reset complete');
};

const main = async () => {
	switch (process.argv[2]) {
		case '--seed':
			await seed()
				.then(() => {
					console.log('Seeding complete');
					process.exit(0);
				})
				.catch((error) => {
					console.error('Error during seeding:', error);
					process.exit(1);
				});
			break;
		case '--reset':
			await reset();
			break;
		default:
			console.error('Invalid argument, use "seed" or "reset"');
			process.exit(1);
	}
	process.exit(0);
};

main();
