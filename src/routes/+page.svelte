<script lang="ts">
	import Header from '../components/header.svelte';
	import Tasks from '../components/tasks.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<Header />
	<Tasks tasks={data.tasks} />
	<div class="sticky bottom-0 p-4">
		<form
			class="flex gap-2 max-w-screen mx-auto bg-gray-300/40 p-4 rounded-2xl border border-gray-300/50 shadow-sm"
			action="add-task"
		>
			<input
				type="text"
				name="task"
				class="block w-full rounded-md border-0 py-1.5 text-gray-900s shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300/20 sm:text-sm sm:leading-6 p-2"
				placeholder="Enter task"
			/>
			<button
				type="submit"
				class="w-1/6 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>Add</button
			>
		</form>
	</div>
</div>
