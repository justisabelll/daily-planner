<div class="m-4 p-4 rounded-2xl border border-gray-300/50 shadow-sm">
  <div class="flex justify-between items-center">
    <p class="text-4xl font-thinner">Daily Planner</p>
    <p class="text-xl font-light">
      {new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })}
    </p>
  </div>
</div>
