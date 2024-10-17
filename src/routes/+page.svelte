<script lang="ts">
	import Header from '../components/header.svelte';
	import Tasks from '../components/tasks.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { invalidateAll } from '$app/navigation';

	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: tasks = data.tasks;

	let taskInput = '';
</script>

<div class="bg-gray-50">
	<Header />
	<Tasks {tasks} />
	<div class="sticky bottom-0 p-4">
		<form
			class="flex gap-2 max-w-screen mx-auto bg-gray-300/40 p-4 rounded-2xl border border-gray-300/50 shadow-sm"
			action="?/addTask"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						toast.success('Task added.');
						taskInput = '';
						await invalidateAll();
					}
				};
			}}
		>
			<input
				type="text"
				name="task"
				class="block w-full rounded-md border-0 py-1.5 text-gray-900s shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300/20 sm:text-sm sm:leading-6 p-2"
				placeholder="Enter task"
				bind:value={taskInput}
			/>
			<button
				type="submit"
				class="w-1/6 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				>Add</button
			>
		</form>
	</div>
</div>
