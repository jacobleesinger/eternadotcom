<script lang="ts">
	import { cart } from '$lib/cart';
	import Pokedollar from './pokedollar.svelte';
	export let item: any;

	let count = 1;

	const increment = () => {
		count += 1;
	};

	const decrement = () => {
		if (count > 1) {
			count -= 1;
		}
	};

	const addToCart = () => {
		cart.update((cart) => {
			const itemExists = cart.items.find((cartItem) => cartItem.item.id === item.id);

			if (itemExists) {
				itemExists.count += count;
			} else {
				cart.items.push({ item, count });
			}

			return cart;
		});

		count = 1;
	};
</script>

<section class="card bg-base-100 w-96 shadow-xl">
	<section class="card-body">
		<figure>
			<img src={item.imageUrl} alt={item.name} height="50" width="50" />
		</figure>
		<h2 class="card-title">{item.name}</h2>

		<p class="card-text">{item.description}</p>
		<p class="card-text"><Pokedollar /> {item.cost}</p>

		<section class="card-actions justify-center items-center">
			<button class="btn btn-sm btn-ghost" onclick={decrement}>-</button>
			<button class="btn btn-primary" onclick={addToCart}>Add {count} to Cart</button>
			<button class="btn btn-sm btn-ghost" onclick={increment}>+</button>
		</section>
	</section>
</section>
