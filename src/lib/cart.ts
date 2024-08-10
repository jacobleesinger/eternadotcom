import { writable } from 'svelte/store';
import type { Cart } from './types';

export const cart = writable<Cart>({
	items: []
});

cart.subscribe((value) => {
	console.log('cart', value);
});
