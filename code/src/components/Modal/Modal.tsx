import React from 'react'
import modal from '../../store/modal'
import { ReactComponent as Close } from '../../image/close.svg'
import s from './Modal.module.css'
import { Form } from '../Form/Form'
import { Link } from 'react-router-dom'
import { RoutesName } from '../../routes'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../../store/auth'

export const Modal = () => {
  const login = (email:string, password:string) => {
    const auths = getAuth();
    signInWithEmailAndPassword(auths, email, password)
      .then(data=>{
        console.log(data)
        if(data.user.email !== null) {
          auth.setUsersEmail(data.user.email)
        }
        auth.setIsAuth(true)
        modal.setShowModal(false)
      })
      .catch(error=>console.log(error))
  }
  return (
    <div className={s.modal_bg} >
      <div className={s.modal}>
        <div className={s.modal_title}>
          <p className={s.title}>Чтобы вы могли добавить репозиторий в избранное, вам надо войти или зарегистрироваться</p>
          <button className={s.close} onClick={()=>modal.setShowModal(false)}><Close className={s.close_img}/></button>
        </div>
        <div className={s.content}>
          <Form title='Вход в систему' handleClick={login}/>
          <div className={s.subtitle}>
            <p>У вас нет учетной записи?</p>
            <Link onClick={()=>modal.setShowModal(false)} to={RoutesName.REGISTRATION} className={s.link}>Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
