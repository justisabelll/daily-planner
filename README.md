# daily-planner

this is a sveltekit version of a simple day planner (todo list) i originally made [here](https://github.com/justisabelll/day-planner)

how to use it:

1. set up your local database:

   - check out this guide for [mysql local setup](https://orm.drizzle.team/docs/guides/mysql-local-setup)
   - for production, you can use any mysql-supported service like [railway](https://railway.app/template/mysql)

2. get redis up and running:

   - [upstash](https://upstash.com/docs/introduction) and [railway](https://railway.app/template/redis) (again) are solid options
   - personally, i'm self-hosting my app, db, and redis through [coolify.io](https://coolify.io/)

3. install dependencies:

   ```bash
   bun install
   ```

4. run db migrations:

   ```bash
   bun run db:generate && bun run db:migrate
   ```

5. start the dev server:

   ```bash
   bun run dev
   ```

that's it
