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
	let isInputVisible = false;

	function toggleInput() {
		isInputVisible = !isInputVisible;
		if (isInputVisible) {
			setTimeout(() => {
				const inputElement = document.querySelector('input[name="task"]') as HTMLInputElement;
				inputElement?.focus();
			}, 0);
		}
	}
</script>

<div class="min-h-screen">
	<Header />
	<Tasks {tasks} />
	<div class="fixed bottom-4 left-0 right-0 px-4">
		<div class="max-w-3xl mx-auto">
			{#if isInputVisible}
				<form
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
					class="relative"
				>
					<div
						class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-lg"
					>
						<input
							type="text"
							name="task"
							class="flex-grow text-lg font-light tracking-wide text-gray-800 bg-transparent border-b border-gray-300 outline-none placeholder-gray-400"
							placeholder="Enter a new task..."
							bind:value={taskInput}
						/>
						<button
							type="submit"
							class="px-4 py-2 text-sm font-light tracking-wide text-gray-700 bg-[#f0f0eb] border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							Add Task
						</button>
					</div>
					<button
						type="button"
						on:click={toggleInput}
						class="absolute top-0 right-0 -mt-3 -mr-3 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full bg-white shadow-sm"
					>
						<svg
							class="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</form>
			{:else}
				<div class="flex justify-center">
					<button
						on:click={toggleInput}
						class="px-6 py-3 text-base font-light tracking-wide text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg"
					>
						<svg
							class="w-5 h-5 inline-block mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							></path>
						</svg>
						Add New Task
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
