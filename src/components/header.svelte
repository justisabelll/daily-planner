<script lang="ts">
	let time = new Date().toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	let date = new Date().toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric'
	});

	setInterval(() => {
		time = new Date().toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}, 1000);
</script>

<div class="p-4">
	<div
		class=" p-6 rounded-2xl bg-white overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-sm hover:border-gray-300"
	>
		<div class="flex justify-between items-center">
			<div class="transform transition-all duration-700 hover:translate-x-1">
				<p class="text-3xl font-light tracking-widest text-gray-800">DAILY PLANNER</p>
				<p class="mt-1 text-xs font-light text-gray-500 uppercase tracking-wider">
					Ephemeral Tasks
				</p>
			</div>
			<div class="text-right">
				<p class="text-lg font-light uppercase tracking-wider text-gray-700">
					{date}
				</p>
				<p
					class="text-2xl font-light uppercase tracking-wide text-gray-800 inline-block transition-all duration-500 hover:tracking-wider"
				>
					{time}
				</p>
			</div>
		</div>
	</div>
</div>
