import axios from "axios";

type Options = {};

class UserKit {
  base_url: string;
  ingredient_url: string;
  constructor() {
    this.base_url = `${process.env.NEXT_PUBLIC_API_BASE}api/v1/user/`;
  }

  createUser(payload: any) {
      return axios.post(`${this.base_url}create/`, payload)
  }

  login(payload: any) {
      return axios.post(`${this.base_url}login/`, payload)
  }

 
}
const userKit = new UserKit();
export default userKit;
