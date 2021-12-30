type Category = "VEGETABLE" | "FRUIT" | "REFRIGERATED" | "SPICE" | "DRY_GOOD";

type Ingredient = {
  name: string;
  base_amount?: number;
  unit?: string;
  category?: Category;
};

type RecipieStep = {
  description: string;
};

type Recipie = {
  name: string;
  id: string;
  ingredients: Ingredient[];
  steps?: RecipieStep[];
  link?: string;
  image_link?: string;
};
