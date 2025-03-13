export type Dirt = number;

export type Ingredients = {
	breads: number;
	fruits: number;
	sauces: number;
	vegetables: number;
};

export type Cleaner = (dirt: Dirt, time?: number) => Dirt;
export type Supplier = (expense: number) => Ingredients;

export type Failure = {
	succeeded: false;
};
export type Success = {
	succeeded: true;
	newStock: Ingredients;
};
export type Recipe = (ingredients: Ingredients) => Failure | Success;

export type Kitchen = {
	announce: () => string;
	clean: (time?: number) => void;
	purchase: (expense: number) => boolean;
	prepare: (recipe: Recipe) => boolean;
};

export function createKitchen(
	budget: number,
	cleaner: Cleaner,
	supplier: Supplier
): Kitchen {
	let dirt: Dirt = 0;
	let stock: Ingredients = {
		breads: 0,
		fruits: 0,
		sauces: 0,
		vegetables: 0,
	};

	return {
		announce() {
			return `I have ${dirt} much dirt, ${budget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`;
		},
		clean(time?: number) {
			dirt = cleaner(dirt, time);
		},
		purchase(expense: number) {
			if (expense > budget) {
				return false;
			}
			budget -= expense;
			const supplies = supplier(expense);
			stock.breads += supplies.breads;
			stock.fruits += supplies.fruits;
			stock.sauces += supplies.sauces;
			stock.vegetables += supplies.vegetables;
			return true;
		},
		prepare(recipe: Recipe) {
			if (dirt >= 100) {
				return false;
			}
			dirt++;
			const recipeResult = recipe(stock);
			if (recipeResult.succeeded) {
				stock = recipeResult.newStock;
			}
			return recipeResult.succeeded;
		},
	};
}
