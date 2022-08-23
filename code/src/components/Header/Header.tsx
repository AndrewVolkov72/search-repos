import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { RoutesName } from '../../routes'
import auth from '../../store/auth'
import { ReactComponent as Logo } from '../../image/Logo.svg'
import s from './Header.module.css'
import { UserProfile } from '../UserProfile/UserProfile'

export const Header = observer( () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Link className={s.logo} to={RoutesName.HOME}>
          <Logo className={s.img}/>
          Git Search
        </Link>
        <Link className={s.link} to={RoutesName.FAVOURITES}>Избранное</Link>
      </div>
      {!auth.isAuth ?
      <Link className={s.link} to={RoutesName.LOGIN}>Войти</Link>
      : <UserProfile/>}
    </header>
  )
})
