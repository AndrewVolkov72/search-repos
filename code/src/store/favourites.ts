import { makeAutoObservable } from "mobx";
import { IRepos } from "../models/IRepos";

class Favourites {
  favRepos:IRepos[] = []

  constructor(){
    makeAutoObservable(this)
  }
  addFav(repos:IRepos) {
    this.favRepos.push(repos)
  }
  removeFav(id:number) {
    this.favRepos = this.favRepos.filter(item=>item.id !== id)
  }
  clearAll() {
    this.favRepos = []
  }
}
export default new Favourites()