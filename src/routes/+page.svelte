<script lang="ts">
	import algoliasearch from 'algoliasearch/lite';
	import Item from '$lib/components/item.svelte';

	const ALGOLIA_APPLICATION_ID = '6HX33Z8XEZ';
	const ALGOLIA_SEARCH_KEY = '8c07b352caf4d761e8c83d0d1752b41f';

	const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_KEY);

	const index = searchClient.initIndex('itemData');

	let results: any[] = [];
	const search = async (e: Event) => {
		console.log('search');
		const { value } = e.target as HTMLInputElement;
		console.log('value', value);
		const { hits } = await index.search(value);

		console.log('hits', hits);

		results = hits;
	};
</script>

<main>
	<input type="text" class="input input-bordered" oninput={search} />

	<h2>Results</h2>
	<section class="flex flex-wrap gap-4">
		{#each results as result}
			<Item item={result} />
		{/each}
	</section>
</main>
