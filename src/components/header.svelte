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

<div class="m-4 p-6 rounded-2xl border border-gray-300/50 shadow-sm bg-white overflow-hidden">
	<div class="flex justify-between items-center">
		<div class="transform transition-all duration-700 hover:translate-x-2">
			<p class="text-5xl font-extralight tracking-tight text-gray-900">DAILY PLANNER</p>
			<p class="mt-2 text-sm font-light text-gray-400 uppercase tracking-widest">Ephemeral Tasks</p>
		</div>
		<div class="relative text-right space-y-4">
			<p class="text-2xl font-serif font-thin uppercase tracking-widest text-gray-700 opacity-80">
				{date}
			</p>
			<p
				class="text-4xl font-sans font-light uppercase tracking-tight text-gray-900 inline-block transition-all duration-500 hover:tracking-widest"
			>
				{time}
			</p>
			<p class="text-xs font-mono tracking-widest text-gray-500 mt-2 opacity-60">NOW</p>
			<div
				class="absolute top-0 right-0 w-16 h-16 border-t border-r border-gray-200 transition-all duration-500 hover:w-20 hover:h-20"
			></div>
		</div>
	</div>
</div>
