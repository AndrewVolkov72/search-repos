import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from '../../components/Form/Form'
import { RoutesName } from '../../routes'
import s from './Registration.module.css'
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../store/auth';

export const Registration = () => {
  const navigate = useNavigate()
  const registration = (email:string, password:string) => {
    const auths = getAuth();
    createUserWithEmailAndPassword(auths, email, password)
      .then(data=>{
        console.log(data)
        if(data.user.email !== null) {
          auth.setUsersEmail(data.user.email)
        }
        auth.setIsAuth(true)
        navigate(RoutesName.HOME)
      })
      .catch(error=>console.log(error))
  }
  return (
    <div className={s.main}>
      <Form title='Регистрация аккаунта' handleClick={registration}
      />
      <div className={s.subtitle}>
        <p>У вас уже есть аккаунт?</p>
        <Link className={s.link} to={RoutesName.LOGIN}>Войти</Link>
      </div>
    </div>
  )
}
