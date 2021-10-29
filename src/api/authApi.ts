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
      .post<User>(`https://aps-weather-app.herokuapp.com/auth/signin`, {
        email: email,
        password: password,
        rememberMe: true,
        headers: { Application: 'AppMobile' },
      })
      .then((res) => {
        userId = res.data.id;
        token = res.data.token;
        return res.data;
      });
  }
  signUp(user: string, email: string, password: string) {
    return axios
      .post<UserSignUp>(`https://aps-weather-app.herokuapp.com/auth/signup`, {
        name: user,
        email: email,
        password: password,
      })
      .then((res) => res.data);
  }
  getCities() {
    console.log('A');
    return axios
      .get<PromiseFavoriteCities>(
        `https://aps-weather-app.herokuapp.com/user/${userId}`,
        {
          headers: { Authorization: token, Application: 'AppMobile' },
        }
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }
  getWeatherFavorityCities() {
    return axios
      .get<CityInfo[]>(
        `https://aps-weather-app.herokuapp.com/user/favorite-city/weather`,
        {
          headers: { Authorization: token, Application: 'AppMobile' },
        }
      )
      .then((res) => {
        const data = { favoriteCityInfo: res.data };
        console.log('data: ', data);
        return data;
      })
      .catch((err) => console.log(err));
  }
  addFavCities(city: string, id: number): Promise<FavCity> {
    console.log('city: ', city, 'woeid: ', id);
    return axios
      .patch<FavCity>(
        `https://aps-weather-app.herokuapp.com/users/favorite-city`,
        {
          cityName: city,
          cityId: id,
        },
        { headers: { Authorization: token, Application: 'AppMobile' } }
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }
  removeFavCities(id: number): Promise<FavCity> {
    return axios
      .delete<FavCity>(
        `https://aps-weather-app.herokuapp.com/users/favorite-city/${id}`,
        {
          headers: { Authorization: token, Application: 'AppMobile' },
        }
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  }
}

export const authApi = new AuthApi();
