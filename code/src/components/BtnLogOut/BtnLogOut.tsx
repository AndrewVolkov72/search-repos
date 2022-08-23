import React from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../../store/auth'
import { RoutesName } from '../../routes'
import s from './BtnLogOut.module.css'
import favourites from '../../store/favourites'

export const BtnLogOut = ({}) => {
  const navigate = useNavigate()
  const logOut = () => {
    auth.setUsersEmail('')
    auth.setIsAuth(false)
    navigate(RoutesName.HOME)
    favourites.clearAll()
  }
  return (
    <button onClick={logOut} className={s.btn}>Выйти</button>
  )
}
