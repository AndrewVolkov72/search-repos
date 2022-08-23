import { makeAutoObservable } from "mobx";

class Modal {
  isShowModal:boolean = false
  constructor(){
    makeAutoObservable(this)
  }
  setShowModal = (value:boolean) => {
    this.isShowModal = value
  }
}
export default new Modal()