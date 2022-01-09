import axios from "axios"


type Options = {}

class ApiKit {
  base_url: string;
  constructor(){
    this.base_url = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/recipies/`
  }

  getRecipies(options?: ListOptions) {
    return axios.get(`${this.base_url}`)
  }

  getRecipie(id:number){
    return axios.get(`${this.base_url}${id}/`)
  }


  createRecipie(recipie:FormRecipie){
    return axios.post(`${this.base_url}`,recipie)
  }
}
const apiKit = new ApiKit
export default apiKit