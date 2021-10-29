import axios from 'axios';
import {
  User,
  PromiseFavoriteCities,
  UserSignUp,
  CityInfo,
  FavCity,
} from '../models';

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
  signUp(user: string, email: string, password: string) {
    return axios
      .post<UserSignUp>(`http://10.0.2.2:3000/auth/signup`, {
        name: user,
        email: email,
        password: password,
      })
      .then((res) => res.data);
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
  getWeatherFavorityCities() {
    return axios
      .get<CityInfo[]>(`http://10.0.2.2:3000/user/favorite-city/weather`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const data = { favoriteCityInfo: res.data };
        console.log('data: ', data);
        return data;
      })
      .catch((err) => console.log(err));
  }
  removeFavCities(id: number): Promise<FavCity> {
    console.log(id);
    return axios
      .delete<FavCity>(`http://10.0.2.2:3000/users/favorite-city/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }
}

export const authApi = new AuthApi();
