<script lang="ts">
	import Item from '$lib/components/item.svelte';
	import { results } from '$lib/results';
</script>

<main>
	<h2 class="text-2xl">Search Results</h2>
	<section class="flex flex-wrap gap-4 mt-4">
		{#each $results as result}
			<Item item={result} />
		{/each}
	</section>
</main>
