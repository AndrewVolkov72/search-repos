import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from '../../components/Form/Form'
import { RoutesName } from '../../routes'
import s from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../store/auth';

export const Login = () => {
  const navigate = useNavigate()
  const login = (email:string, password:string) => {
    const auths = getAuth();
    signInWithEmailAndPassword(auths, email, password)
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
      <Form title='Вход в систему' handleClick={login}
      />
      <div className={s.subtitle}>
        <p>У вас нет учетной записи?</p>
        <Link className={s.link} to={RoutesName.REGISTRATION}>Зарегистрироваться</Link>
      </div>
    </div>
  )
}
