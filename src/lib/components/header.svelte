<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
	import { config } from '@fortawesome/fontawesome-svg-core';
	import algoliasearch from 'algoliasearch/lite';

	import { cart } from '$lib/cart';
	import { results } from '$lib/results';

	import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
	import type { Item } from '$lib/types';
	config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

	$: totalCartCount = $cart.items.reduce((acc, item) => acc + item.count, 0);

	const ALGOLIA_APPLICATION_ID = '6HX33Z8XEZ';
	const ALGOLIA_SEARCH_KEY = '8c07b352caf4d761e8c83d0d1752b41f';

	const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_KEY);

	const index = searchClient.initIndex('itemData');

	const search = async (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		const { hits } = await index.search(value);

		results.set(hits as unknown as Item[]);
	};
</script>

<header class="navbar bg-base-100 px-4">
	<nav class="navbar bg-base-100 flex">
		<a class="flex-1" href="/">
			<h1 class="text-6xl text-primary">Eterna</h1>
			<span class="text-lg">MART</span>
		</a>
		<section class="flex-1">
			<input type="text" class="input input-bordered" oninput={search} placeholder="Search Items" />
		</section>

		<a class="flex-none" href="/cart">
			<span class="mr-2">{totalCartCount}</span>
			<FontAwesomeIcon icon={faCartShopping} class="cart-icon" />
		</a>
	</nav>
</header>

<style>
	h1 {
		font-family: 'Berkshire Swash', cursive;
	}
</style>
