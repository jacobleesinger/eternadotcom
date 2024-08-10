<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
	import { config } from '@fortawesome/fontawesome-svg-core';

	import { cart } from '$lib/cart';

	import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
	config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

	$: totalCartCount = $cart.items.reduce((acc, item) => acc + item.count, 0);
</script>

<header class="navbar bg-base-100 px-4">
	<nav class="navbar bg-base-100">
		<a class="flex-1" href="/">
			<h1 class="text-6xl text-primary">Eterna</h1>
			<span class="text-lg">MART</span>
		</a>

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
