export const reasons: Reason[] = [
  "VEGITARIAN",
  "VEGAN",
  "DAIRY",
  "MP_ALLERGIES",
  "GLUTEN",
  "LEGUMINOUS",
];

export const units: Unit[] = [
  {
    value: "-1",
    title: "Ingen enhet"
  },
  {
    value: "st",
    title: "Styck"
  },
  {
    value: "ml",
    title: "Milliliter"
  },
  {
    value: "cl",
    title: "Centiliter"
  },
  {
    value: "dl",
    title: "Deciliter"
  },{
    value: "l",
    title: "Liter"
  }
  ,{
    value: "g",
    title: "Gram"
  },{
    value: "kg",
    title: "Kilogram"
  },
  {
    value: "krm",
    title: "Kryddmått"
  },
  {
    value: "tsk",
    title: "Tesked"
  }, {
    value: "msk",
    title: "Matsked"
  }
]

export const categories: CategoryObj[] = [
  {
    value: "-1",
    title: "Ingen kategori"
  },
  {
    value: "FRUIT",
    title: "Frukt"
  },
  {
    value: "VEGETABLE",
    title: "Grönsak"
  },
  {
    value: "DRY_GOOD",
    title: "Torrvara"
  },{
    value: "REFRIGERATED",
    title: "Kylvara"
  }
  ,{
    value: "SPICE",
    title: "Krydda/Tillbehör"
  }
]

export const translatedReasons = {
  VEGITARIAN: "Veg",
  VEGAN: "Vegan",
  DAIRY: "Laktos",
  MP_ALLERGIES: "Mjölkprotein",
  GLUTEN: "Gluten",
  LEGUMINOUS: "Balj",
};

export const getIngredientPortioned = (
  ingredient: Ingredient,
  portions: number
): number => {
  if (!ingredient.amount) return 0;
  let amount = ingredient.amount / 4;
  amount = amount * portions;

  if(amount < 1){
    return Number(amount.toFixed(2))
  }
  return Math.round(amount)
};

const baseSizes = {
  xs: 0.7,
  sm: 0.8,
  md: 0.9,
  lg: 1,
  xl: 1,
};


const advancedSizes = {
  VEGITARIAN: 1,
  GLUTEN: 1,
  VEGAN: 1,
  LEGUMINOUS: 1,
  DAIRY: 1,
  MP_ALLERGIES: 1,
};

const portionSizes = {
  ...baseSizes,
  ...advancedSizes,
};

export const _getPortions = (_portions: Portions) => {
  const keys = Object.keys(_portions).filter(key => key.length <= 2)
  
  const collectedPortions = keys
    .map((key) => _portions[key] * baseSizes[key])
    .reduce((sum, a) => sum + a);
  return collectedPortions
};

export const anyAdvancedSelected = (_portions: Portions) => {
  const advancedKeys = Object.keys(advancedSizes);
  return advancedKeys.some((key) => _portions[key] > 0);
};
