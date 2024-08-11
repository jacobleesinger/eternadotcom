<script lang="ts">
	import { goto } from '$app/navigation';
	import { cart } from '$lib/cart';
	import Pokedollar from '$lib/components/pokedollar.svelte';

	$: items = $cart.items;
	$: total = $cart.items.reduce((acc, item) => {
		return acc + item.count * item.item.cost;
	}, 0);

	const checkout = () => {
		console.log('checkout');
		cart.update((cart) => {
			cart.items = [];
			return cart;
		});

		goto('/');
	};
</script>

<main class="mt-4">
	<h2 class="text-2xl">Your Cart</h2>

	<section class="overflow-x-auto bg-base-100 mt-4 p-8">
		<table class="table">
			<thead>
				<tr>
					<th></th>
					<th></th>
					<th>Count</th>
					<th>price</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item}
					<tr>
						<td>
							<img src={item.item.imageUrl} alt={item.item.name} height="50" width="50" />
						</td>
						<td>{item.item.name}</td>
						<td>{item.count}</td>
						<td><Pokedollar /> {item.item.cost}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3">Total</td>
					<td><Pokedollar /> {total}</td>
				</tr>
			</tfoot>
		</table>
		<section class="flex justify-end mt-4">
			<button class="btn btn-primary" onclick={checkout}>Check Out</button>
		</section>
	</section>
</main>
