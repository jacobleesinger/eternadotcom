import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/items.json');
const url = new URL('https://pokeapi.co/api/v2/item/');

let file = fs.readFileSync(filePath, 'utf-8');

let items = JSON.parse(file);

// number of items in pokeapi
const count = 2180;

// fetch items from pokeapi in parallel
const promises = [];
for (let i = 1; i <= count; i++) {
	promises.push(fetch(`${url}${i}/`));
}

// parse all the items
const results = await Promise.allSettled(promises);

const successResults = results.filter((result) => result.status === 'fulfilled');

const data = successResults.map((result) => result.value);

const itemResults = [];

for (const item of data) {
	try {
		const json = await item.json();
		itemResults.push(json);
	} catch (e) {
		console.log('error parsing item', item.id);
		console.log(e);
	}
}

// get the items and fields we want
for (const itemResult of itemResults) {
	// only want purchaseable items
	if (itemResult.cost === 0) continue;

	// only want firered-leafgreen items
	const description = itemResult.flavor_text_entries.find(
		(e) => e.language.name === 'en' && e.version_group.name === 'firered-leafgreen'
	)?.text;

	if (!description) continue;

	const item = {
		id: itemResult.id,
		name: itemResult.names.find((n) => n.language.name === 'en').name,
		description,
		cost: itemResult.cost,
		imageUrl: itemResult.sprites.default,
		category: itemResult.category.name
	};

	items.push(item);
}

fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
