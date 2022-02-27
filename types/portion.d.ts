type BasePortionKey = "xs"
| "sm"
| "md"
| "lg"
| "xl";

type AdvancedPortionKey = "VEGITARIAN"
| "VEGAN"
| "DAIRY"
| "MP_ALLERGIES"
| "GLUTEN"
| "LEGUMINOUS";

type PortionKey = BasePortionKey | AdvancedPortionKey

type Portions = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  VEGITARIAN: number;
  VEGAN: number;
  DAIRY: number;
  MP_ALLERGIES: number;
  GLUTEN: number;
  LEGUMINOUS: number;
};
