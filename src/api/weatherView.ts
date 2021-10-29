import axios from 'axios';
import { CityInfo, FavCity } from '../models';

class WeatherView {
  getCities(city: string): Promise<CityInfo> {
    return axios
      .get<CityInfo>(`https://aps-weather-app.herokuapp.com/weather?cityName=${city}`, {
        headers: { Application: 'AppMobile' },
      })
      .then((res) => res.data);
  }

  getFavCity(city: string): Promise<FavCity> {
    return axios
      .get<FavCity>(`https://aps-weather-app.herokuapp.com/cities/city?cityName=${city}`, {
        headers: { Application: 'AppMobile' },
      })
      .then((res) => res.data);
  }

  removeFavCities(id: number): Promise<FavCity> {
    console.log(id);
    return axios
      .delete<FavCity>(`https://aps-weather-app.herokuapp.com/users/favorite-city/${id}`, {
        headers: { Application: 'AppMobile' },
      })
      .then((res) => res.data);
  }
}

export const weatherView = new WeatherView();
