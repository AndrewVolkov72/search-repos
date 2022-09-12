import React, { useEffect, useState } from 'react'
import { Search } from '../../components/Search/Search'
import s from './Home.module.css'

export const Home = () => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(null)

  const placeholders = [
    {title:'axios'},
    {title:'Yandex'},
    {title:'Node.js'},
    {title:'public-apis'},
    {title:'facebook'},
  ]
  
  const getRandomNum = (num:number) => Math.floor(Math.random() * num)
  // useEffect(()=>{
  // 
  // },[])
  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Поиск репозиториев ещё никогда не был таким простым</h1>
        {/* {currentPlaceholder !== null && <p>Например, введите <span className={s.placeholder}>{currentPlaceholder}</span></p>} */}
        <p>Например, введите <span className={s.placeholder}>{placeholders[getRandomNum(placeholders.length)].title}</span></p>
      </div>
      <Search/>
    </div>
  )
}