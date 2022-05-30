import axios from "axios";
import StorageKit from "./StorageKit";

type Options = {};

class ApiKit {
  recipie_url: string;
  ingredient_url: string;
  constructor() {
    this.recipie_url = `${process.env.NEXT_PUBLIC_API_BASE}api/v1/recipies/`;
    this.ingredient_url = `${process.env.NEXT_PUBLIC_API_BASE}api/v1/ingredients/`;
  }

  getRecipies(options?: ListOptions) {
    const query = Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join("&");
    return axios.get(`${this.recipie_url}?${query}`);
  }

  getRecipie(id: number) {
    return axios.get(`${this.recipie_url}${id}/`);
  }

  createRecipie(recipie: FormRecipie) {
    return this.authenticatedPost(`${this.recipie_url}`, recipie);
  }

  updateRecipie(recipie: FormRecipie, id: any) {
    return this.authenticatedPut(`${this.recipie_url}${id}/`, recipie);
  }

  getIngredients(options?: ListOptions) {
    const query = Object.keys(options)
      .filter(key => options[key] !== null)
      .map((key) => `${key}=${options[key]}`)
      .join("&");
    return axios.get(`${this.ingredient_url}?${query}`);
  }

  createIngredient(ingredients: BaseIngredient | BaseIngredient[]) {
    return axios.post(`${this.ingredient_url}`, ingredients);
  }

  authenticatedPost(url: string, payload: any) {
    const access = StorageKit.getItem("@LOCAL_ACCESS")
    return axios.post(url, payload, {
      headers: { 'Authorization': `Bearer ${access}`}
    });
  }
  authenticatedGet(url: string) {
    const access = StorageKit.getItem("@LOCAL_ACCESS")
    return axios.get(url, {
      headers: { 'Authorization': `Bearer ${access}`}
    });
  }

  authenticatedPut(url: string, payload: any) {
    const access = StorageKit.getItem("@LOCAL_ACCESS")
    return axios.put(url,payload, {
      headers: { 'Authorization': `Bearer ${access}`}
    });
  }

  authenticatedDelete(url: string) {
    const access = StorageKit.getItem("@LOCAL_ACCESS")
    return axios.delete(url, {
      headers: { 'Authorization': `Bearer ${access}`}
    });
  }
}
const apiKit = new ApiKit();
export default apiKit;
