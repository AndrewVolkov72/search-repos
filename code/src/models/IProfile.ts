import { IUser } from "./IUser";

export interface IProfile extends IUser {
  name: string;
  location: string;
  followers:number
  company:string;
  blog:string;
  public_repos:number;
  html_url:string;
}