import { writable } from 'svelte/store';
import type { Item } from './types';

export const results = writable<Item[]>([]);
