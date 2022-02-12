type Category = "VEGETABLE" | "FRUIT" | "REFRIGERATED" | "SPICE" | "DRY_GOOD";

type Reason =
  | "VEGITARIAN"
  | "VEGAN"
  | "DAIRY"
  | "MP_ALLERGIES"
  | "GLUTEN"
  | "LEGUMINOUS";

type BaseIngredient = {
  name: string;
  unit?: string;
  category?: Category;
  id: string;
};

type Ingredient = BaseIngredient & {
  ingredient_id?: string;
  amount?: number;
  id: string;
  replaces?: string;
  replaces_reason?: Reason;
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
  description?: string;
};

type FormRecipie = {
  name: string;
  ingredients: Ingredient[];
  link?: string;
  image_link?: string;
  description?: string;
};

type ListOptions = {
  page: number;
  search?: string;
};
