import axios from "axios"


type Options = {}

class ApiKit {
  base_url: string;
  constructor(){
    this.base_url = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/recipies/`
  }

  getRecipies() {
    return axios.get(`${this.base_url}`)
  }

  getRecipie(id:number){
    return axios.get(`${this.base_url}${id}/`)
  }
}
const apiKit = new ApiKit
export default apiKit