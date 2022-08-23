import { Favourites } from "../pages/Favourites/Favourites";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Registration } from "../pages/Registration/Registration";
import { Users } from "../pages/Users/Users";

export enum RoutesName {
  HOME = '/',
  FAVOURITES = '/favourites',
  USER = '/user/:name',
  LOGIN = '/login',
  REGISTRATION = '/registration'
}

export const routes = [
  {path:RoutesName.HOME, element: <Home/>},
  {path:RoutesName.FAVOURITES, element: <Favourites/>},
  {path:RoutesName.USER, element: <Users/>},
  {path:RoutesName.LOGIN, element: <Login/>},
  {path:RoutesName.REGISTRATION, element: <Registration/>},
]