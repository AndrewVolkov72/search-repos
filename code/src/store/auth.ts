import { makeAutoObservable } from "mobx";

class Auth {
  isAuth:boolean = false
  userEmail:string = ''

  constructor(){
    makeAutoObservable(this)
  }
  setIsAuth = (value:boolean) => {
    this.isAuth = value
  }
  setUsersEmail(value:string) {
    this.userEmail = value
  }
}
export default new Auth()