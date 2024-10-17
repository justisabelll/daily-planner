<script lang="ts">
	import type { Task } from '$lib/server/db/schema';

	export let tasks: Task[];
</script>

<div class="overflow-hidden my-6 p-4">
	<div class="px-4 py-5 sm:p-6 gap-4 flex flex-col">
		{#each tasks as task}
			<div
				class={`p-4 rounded-2xl flex items-center justify-between ${
					task.completed ? 'bg-green-400/20' : ''
				} border border-gray-300/50 shadow-sm transition-all duration-300 ease-in-out`}
			>
				<div class="flex items-center flex-1 space-x-3">
					<div
						class={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
							task.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
						} transition-all duration-300 ease-in-out`}
					>
						{#if task.completed}
							<svg class="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</div>
					<p
						class={`text-2xl font-medium transition-all duration-300 ease-in-out ${
							task.completed ? 'text-gray-500' : 'text-gray-900'
						}`}
					>
						{task.task}
					</p>
				</div>
				<label class="flex items-center">
					<span class="mr-2 text-xs text-gray-600">Mark as done</span>
					<input
						bind:checked={task.completed}
						type="checkbox"
						name="completed"
						class="h-5 w-5 text-green-500 rounded focus:ring-green-400"
					/>
				</label>
			</div>
		{/each}
	</div>
</div>
