import React, { FC, useEffect, useState } from 'react'
import { useDateTransform } from '../../hooks/useDateTransform'
import { IRepos } from '../../models/IRepos'
import auth from '../../store/auth'
import favourites from '../../store/favourites'
import modal from '../../store/modal'
import s from './Repos.module.css'
import { ReactComponent as Heart} from '../../image/repo/heart.svg'
import { ReactComponent as HeartActive} from '../../image/repo/heart-active.svg'
import { ReactComponent as Fork} from '../../image/repo/fork.svg'
import { ReactComponent as Star} from '../../image/repo/star.svg'

export const Repos:FC<IRepos> = ({id, name, description, language, created_at, html_url, forks_count, stargazers_count}) => {
  const [favouritesBtn, setFavouritesBtn] = useState(false)

  const date = new Date(Date.parse(created_at))
  const dateYear = date.getFullYear()
  const dateDay = useDateTransform(date.getDate())
  const dateMonth = useDateTransform(date.getMonth() + 1)

  const addFav = () => {
    const item:IRepos = {
      id,
      name,
      description,
      language,
      html_url,
      created_at,
      forks_count,
      stargazers_count
    }
    favourites.addFav(item)
    setFavouritesBtn(true)
  }
  const removeFav = () => {
    favourites.removeFav(id)
    setFavouritesBtn(false)
  }
  const openModal = () => {
    modal.setShowModal(true)
  }
  const findItemsOnFavArr = (id:number) => favourites.favRepos.map(item=>item.id === id && setFavouritesBtn(true))
  useEffect(()=>{
    findItemsOnFavArr(id)
  },[])

  return (
    <div className={s.repo}>
      <div className={s.title}>
        <p>Название: <span className={s.name}>{name}</span></p>
        {!favouritesBtn &&
        <button
          className={s.btn_fav}
          onClick={auth.isAuth ? ()=>addFav() : openModal}
        >
          <Heart className={s.btn_fav_img}/>
          Добавить в избранное
        </button>}
        {favouritesBtn &&
        <button
          className={s.btn_fav}
          onClick={()=>removeFav()}
        >
          <HeartActive className={s.btn_fav_img}/>
          Убрать из избранного
        </button>}
      </div>
      {description !== null && <div className={s.desc}>
        <p>Описание: {description}</p>
      </div>}
      <div className={s.content}>
        {language !== null &&
        <div className="">
          <p>Язык: {language}</p>
        </div>}
        <div className={s.repo_count}>
          <div className={s.count}>
            <Star className={s.count_img}/>
            <p>{stargazers_count}</p>
          </div>
          <div className={s.count}>
            <Fork className={s.count_img}/>
            <p>{forks_count}</p>
          </div>
        </div>
      </div>
      <div className={s.wrapper}>
        <p>Создано: {`${dateDay}.${dateMonth}.${dateYear}`}</p>
        <a className={s.link} href={html_url} target='_blank'>Ссылка на репозиторий</a>
      </div>
    </div>
  )
}
