import FavoriteCities from "./FavoriteCities";
import FavoriteCitiesInfo from "./promises/FavoriteCitiesInfo";
import User from "./User";

export default interface AuthContextData {
  signed: boolean;
  haveUser: boolean;
  loading: boolean;
  user: User;
  favoriteCities: FavoriteCities;
  favoriteCitiesInfo: FavoriteCitiesInfo;
  signIn(email: string, password: string): Promise<void>;
  signUp(user: string, email: string, password: string): Promise<void>;
  signOut(): void;
  favoriteCity(): void;
}