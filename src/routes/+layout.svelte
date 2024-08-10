<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '../app.css';
</script>

<Header />
<main class=" max-w-7xl px-8 pt-4 m-8">
	<slot />
</main>
