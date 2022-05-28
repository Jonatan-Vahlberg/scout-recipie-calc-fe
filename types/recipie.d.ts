type Category = "VEGETABLE" | "FRUIT" | "REFRIGERATED" | "SPICE" | "DRY_GOOD" | "-1";

type CategoryObj = {
  value: Category;
  title: string;
}

type IngredientMode = "NEW" | "PREEXISTING";

type UnitSignifier = "ml" | "cl" | "dl" | "l" | "g" | "kg" | "krm" | "tsk" | "msk" |  "st" | "-1";

type Unit = {
  value: UnitSignifier;
  title: string;
}

type Reason =
  | "VEGITARIAN"
  | "VEGAN"
  | "DAIRY"
  | "MP_ALLERGIES"
  | "GLUTEN"
  | "LEGUMINOUS";

type BaseIngredient = {
  name: string;
  unit?: UnitSignifier;
  category?: Category;
  id: string;
};

type Ingredient = {
  amount?: number;
  id: string;
  replaces?: string;
  replaces_reason?: Reason;
  ingredient: BaseIngredient;
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
