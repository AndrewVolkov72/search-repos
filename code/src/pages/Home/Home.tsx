import React from 'react'
import { Search } from '../../components/Search/Search'
import s from './Home.module.css'

export const Home = () => {
  return (
    <div className={s.home}>
      <h1 className={s.title}>Поиск репозиториев ещё никогда не был таким простым</h1>
      <Search/>
    </div>
  )
}