import axios from "axios";

type Options = {};

class ApiKit {
  base_url: string;
  ingredient_url: string;
  constructor() {
    this.base_url = `${process.env.NEXT_PUBLIC_API_BASE}api/v1/recipies/`;
    this.ingredient_url = `${process.env.NEXT_PUBLIC_API_BASE}api/v1/ingredients/`;
  }

  getRecipies(options?: ListOptions) {
    const query = Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join("&");
    return axios.get(`${this.base_url}?${query}`);
  }

  getRecipie(id: number) {
    return axios.get(`${this.base_url}${id}/`);
  }

  createRecipie(recipie: FormRecipie) {
    return axios.post(`${this.base_url}`, recipie);
  }

  getIngredients(options?: ListOptions) {
    const query = Object.keys(options)
      .filter(key => options[key] !== null)
      .map((key) => `${key}=${options[key]}`)
      .join("&");
    return axios.get(`${this.ingredient_url}?${query}`);
  }

  createIngredient(ingredient: BaseIngredient) {
    return axios.post(`${this.base_url}`, ingredient);
  }
}
const apiKit = new ApiKit();
export default apiKit;
