import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../../models/IUser'
import s from './User.module.css'

export const User:FC<IUser> = ({login, avatar_url}) => {
  return (
    <Link className={s.item} to={`/user/${login.toLocaleLowerCase()}`}>
      <img className={s.img} src={avatar_url} alt={login} />
      {login}
    </Link>
  )
}
