<script lang="ts">
	export let item: any;
</script>

<section class="card bg-base-100 w-96 shadow-xl">
	<div class="card-body">
		<figure>
			<img src={item.imageUrl} alt={item.name} height="50" width="50" />
		</figure>
		<h2 class="card-title">{item.name}</h2>

		<p class="card-text">{item.description}</p>

		<section class="card-actions justify-end">
			<button class="btn btn-primary">Add to Cart</button>
		</section>
	</div>
</section>
