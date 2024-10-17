<script lang="ts">
	import type { Task } from '$lib/server/db/schema';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let tasks: Task[];

	$: sortedTasks = tasks.sort((a, b) => {
		if (a.completed === b.completed) return 0;
		return a.completed ? 1 : -1;
	});

	function handleToggle(task: Task) {
		const index = tasks.findIndex((t) => t.id === task.id);
		if (index !== -1) {
			tasks[index].completed = !tasks[index].completed;
			tasks = [...tasks]; // Trigger reactivity
		}
	}
</script>

<div class="overflow-hidden my-12 p-8">
	<div class="max-w-3xl mx-auto space-y-6">
		{#each sortedTasks as task (task.id)}
			<div
				animate:flip={{ duration: 400 }}
				in:fade={{ duration: 400 }}
				out:fly={{ y: 50, duration: 400 }}
				class={`p-6 rounded-2xl flex items-center justify-between ${
					task.completed ? 'bg-gray-50' : 'bg-white'
				} border border-gray-200 shadow-sm transition-all duration-500 ease-in-out hover:shadow-sm`}
			>
				<div class="flex items-center flex-1 space-x-4 min-w-0">
					<div
						class={`flex-shrink-0 w-8 h-8 rounded-full border-2 ${
							task.completed ? 'border-gray-300 bg-gray-300' : 'border-gray-400'
						} transition-all duration-500 ease-in-out`}
					>
						{#if task.completed}
							<svg class="w-7 h-7 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</div>
					<p
						class={`text-xl font-light tracking-wide transition-all duration-500 ease-in-out ${
							task.completed ? 'text-gray-400' : 'text-gray-800'
						}`}
					>
						{task.task}
					</p>
				</div>
				<div class="flex items-center ml-4 flex-shrink-0">
					<form
						action="?/toggleTask"
						method="POST"
						use:enhance={() => {
							return ({ result }) => {
								if (result.type === 'success') {
									handleToggle(task);
								}
							};
						}}
					>
						<input type="hidden" name="id" value={task.id} />
						<input type="hidden" name="completionState" value={!task.completed} />
						<button
							type="submit"
							class={`px-4 py-2 text-sm font-light tracking-wide ${
								task.completed
									? 'text-gray-400 bg-gray-100 border-gray-200'
									: 'text-gray-600 bg-white border-gray-300'
							} border rounded-full hover:bg-gray-200 hover:text-gray-800 hover:border-gray-400 hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300`}
						>
							{task.completed ? 'Undo' : 'Complete'}
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
</div>
