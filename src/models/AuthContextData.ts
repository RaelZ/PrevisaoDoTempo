import FavoriteCities from "./FavoriteCities";
import User from "./User";

export default interface AuthContextData {
  signed: boolean;
  haveUser: boolean;
  loading: boolean;
  user: User;
  favoriteCities: FavoriteCities;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}