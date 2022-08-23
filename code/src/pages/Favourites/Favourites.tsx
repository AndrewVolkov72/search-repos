import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { BtnNumPagination } from '../../components/BtnNumPagination/BtnNumPagination'
import { Repos } from '../../components/Repos/Repos'
import { IRepos } from '../../models/IRepos'
import auth from '../../store/auth'
import favourites from '../../store/favourites'
import s from './Favourites.module.css'

export const Favourites = observer(() => {
  const [pages, setPages] = useState<number[]>([])
  const [itemOnPage, setItemOnPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  let lastPage = currentPage * itemOnPage
  let firstPage = lastPage - itemOnPage
  let currentArr = favourites.favRepos.slice(firstPage, lastPage)

  const getPages = () => {
    let newArray = []
    for(let i =0; i < Math.ceil(favourites.favRepos.length / itemOnPage); i++) {
      newArray.push(i+1)
    }
    setPages(newArray)
  }
  useEffect(()=>{
    getPages()
  }, [favourites.favRepos.length])

  return (
    <div className={s.main}>
      {!auth.isAuth &&
       <div className={s.title_wrapper}>
        <p className={s.title}>Чтобы вы могли добавить репозиторий в избранное <br /> Вам надо войти или зарегистрироваться</p>
      </div>}
      {auth.isAuth && favourites.favRepos.length === 0  &&
      <div className={s.title_wrapper}>
        <p className={s.title}>У вас сейчас нет избранных репозиториев<br />Если вам понравился репозиторий, который вы нашли в поиске <br /> Вы можете добавить его в избранное, чтобы не потерять и вернуться к нему позже</p>
      </div>}
      {auth.isAuth && <div className={s.content}>
        {favourites.favRepos.length > 0 &&
          currentArr.map(item=><Repos
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            html_url={item.html_url}
            language={item.language}
            created_at={item.created_at}
            forks_count={item.forks_count}
            stargazers_count={item.stargazers_count}
          />)}
      </div>}
      {auth.isAuth && pages.length > 0 &&
        <div className={s.pagination}>
          {pages.map(item=><BtnNumPagination key={item} num={item} handleClick={()=>setCurrentPage(item)}/>)}
        </div>}
    </div>
  )
})