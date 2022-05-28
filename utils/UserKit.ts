import axios from "axios";
import apiKit from "./ApiKit";

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
      return axios.post(`${process.env.NEXT_PUBLIC_API_BASE}api/token/`, payload)
  }

  refresh(payload: any) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_BASE}api/token/refresh/`, payload)
  }

  getUser() {
    return apiKit.authenicatedGet(`${this.base_url}`)
  }
}
const userKit = new UserKit();
export default userKit;
