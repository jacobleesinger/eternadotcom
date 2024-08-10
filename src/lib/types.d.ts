export type Item = {
	id: number;
	name: string;
	description: string;
	cost: number;
	imageUrl: string;
	category: string;
};

export type CartItem = {
	item: Item;
	count: number;
};

export type Cart = {
	items: CartItem[];
};
