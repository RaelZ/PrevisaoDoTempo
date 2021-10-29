import axios from 'axios';
import { CityInfo, FavCity } from '../models';

class WeatherView {
  getCities(city: string): Promise<CityInfo> {
    return axios
      .get<CityInfo>(`http://10.0.2.2:3000/weather?cityName=${city}`)
      .then((res) => res.data);
  }

  getFavCity(city: string): Promise<FavCity> {
    return axios
      .get<FavCity>(`http://10.0.2.2:3000/cities/city?cityName=${city}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  addFavCities(city: string, id: number): Promise<FavCity> {
    console.log('city: ', city, 'woeid: ', id);
    return axios
      .post<FavCity>(`http://10.0.2.2:3000/users/favorite-city`, {
        cityName: city,
        cityId: id,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  }
  removeFavCities(id: number): Promise<FavCity> {
    console.log(id)
    return axios
      .delete<FavCity>(`http://10.0.2.2:3000/users/favorite-city/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
}

export const weatherView = new WeatherView();
