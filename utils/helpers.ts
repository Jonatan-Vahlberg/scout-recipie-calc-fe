export const getIngredientPortioned = (
  ingredient: Ingredient,
  portions: number
) => {
  if (!ingredient.base_amount) return "";
  let amount = ingredient.base_amount / 4;
  amount = amount * portions;
  if (ingredient.unit === "st") return Math.ceil(amount);
  if (amount > 1000) return Math.round(amount / 100) * 100;
  if (amount > 500) return Math.round(amount / 50) * 50;
  if (amount > 50) return Math.round(amount / 10) * 10;
  if (amount < 10 && ingredient.category === "SPICE")
    return (Math.round(amount * 10) / 10).toFixed(1);
  return amount;
};

const portionSizes = {
  xs: 0.7,
  sm: 0.8,
  md: 0.9,
  lg: 1,
  xl: 1,
};

export const _getPortions = (_portions: Portions) => {
  const keys = Object.keys(_portions);

  return keys
    .map((key) => _portions[key] * portionSizes[key])
    .reduce((sum, a) => sum + a);
};
