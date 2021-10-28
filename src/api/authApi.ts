import axios from 'axios';
import { User, PromiseFavoriteCities } from '../models';

let userId = null as any;
let token = null as any;

class AuthApi {
  doAuth(email: string, password: string) {
    return axios
      .post<User>(`http://10.0.2.2:3000/auth/signin`, {
        email: email,
        password: password,
        rememberMe: true,
      })
      .then((res) => {
        userId = res.data.id;
        token = res.data.token;
        return res.data;
      });
  }
  getCities() {
    console.log('A');
    return axios
      .get<PromiseFavoriteCities>(`http://10.0.2.2:3000/user/${userId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }
}

export const authApi = new AuthApi();
