import { db } from '$lib/server/db/index';
import { tasks } from '$lib/server/db/schema';

const seed = async () => {
  let hasTasks = false;
  console.log('Checking if database already has tasks...');

  try {
    hasTasks = (await db.select().from(tasks).limit(1)).length > 0;
  } catch (error) {
    console.error(
      'Error checking if database has tasks, tables might not be created:',
      error
    );
    return;
  }

  if (hasTasks) {
    console.log('Database already has tasks, skipping seeding...');
    return;
  }

  console.log('Seeding...');

  await db
    .insert(tasks)
    .values([
      { task: 'try ruby on rails' },
      { task: 'visit french luandry ' },
      { task: 'buy rick hoodie' },
      { task: 'vote' },
      { task: 'watch godfather 2' },
      { task: 'write blog post about consuming news' },
    ]);
};

seed()
  .then(() => {
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
