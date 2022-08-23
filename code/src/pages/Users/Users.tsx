import axios from 'axios'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BtnTextPagination } from '../../components/BtnTextPagination/BtnTextPagination'
import { Modal } from '../../components/Modal/Modal'
import { Profile } from '../../components/Profile/Profile'
import { Repos } from '../../components/Repos/Repos'
import { ImagePosition } from '../../models/IBtnText'
import { IProfile } from '../../models/IProfile'
import { IRepos } from '../../models/IRepos'
import modal from '../../store/modal'
import { BASE_URL, USERS_URL } from '../../urlParams/github.api'
import s from './Users.module.css'

export const Users = observer(() => {
  const [repos, setRepos] = useState<IRepos[]>([])
  const [userData, setUserData] = useState<IProfile>()
  const [totalPage, setTotalPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const {name} = useParams()

  const getUserInfo = () => {
    axios({
      url: BASE_URL + USERS_URL + `/${name}`,
      params: {
        subject_type: 'repository'
      }
    })
    .then(res=>{
      console.log(res.data)
      setUserData(res.data)
      setTotalPage(Math.ceil(res.data.public_repos / perPage))
    })
    .catch(error=>console.log('ошибка', error))
  }

  const getUserRepos = (page:number, perPage:number ) => {
    axios({
      url: BASE_URL + USERS_URL + `/${name}/repos`,
      params: {
        per_page: perPage,
        page: page,
      }
    })
    .then(res=>{
      console.log(res.data)
      setRepos(res.data)
    })
    .catch(error=>console.log('ошибка', error))
  }

  useEffect(()=>{
    getUserInfo()
  },[])
  useEffect(()=>{
    getUserRepos(currentPage, perPage)
  }, [name, currentPage])
  
  return (
    <div className={s.main}>
      <div className={s.page_content}>
        {userData !== undefined && <Profile
          name={userData.name}
          login={userData.login}
          blog={userData.blog}
          company={userData.company}
          location={userData.location}
          avatar_url={userData.avatar_url}
          followers={userData.followers}
          html_url={userData.html_url}
          public_repos={userData.public_repos}
        />}
        {repos.length > 0 ?
          <div className={s.content}>
            {repos.map(item=><Repos
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
          </div>
          : <div className="">
              <p>Репозиториев не найдено</p>
            </div>}
      </div>
      {userData && userData.public_repos > 10 && <div className={s.pagination}>
        <BtnTextPagination
          text='Назад'
          handleClick={currentPage > 1 ? ()=>setCurrentPage(prev=>prev - 1) : undefined}
          position={ImagePosition.LEFT}
        />
        <BtnTextPagination
          text='Вперёд'
          handleClick={currentPage !== totalPage ? ()=>setCurrentPage(prev=>prev + 1) : undefined}
          position={ImagePosition.RIGHT}
        />
      </div>}
      {modal.isShowModal && <Modal/>}
    </div>
  )
})