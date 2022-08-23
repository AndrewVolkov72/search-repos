import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImagePosition } from '../../models/IBtnText'
import { IUser } from '../../models/IUser'
import { BASE_URL, SEARCH_URL, USERS_URL } from '../../urlParams/github.api'
import { Alert } from '../Alert/Alert'
import { BtnTextPagination } from '../BtnTextPagination/BtnTextPagination'
import { User } from '../User/User'
import s from './Search.module.css'

export const Search = () => {
  const [value, setValue] = useState<string>('')
  const [data, setData] = useState<any>({})

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(20)

  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)

  const [isError, setIsError] = useState<boolean>(false)
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [errorData, setErrorData] = useState<string>('')

  const getUsersLists = (page:number, perPage:number, value:string,) => {
    axios({
      url: BASE_URL + SEARCH_URL + USERS_URL,
      params: {
        q: value.trim(),
        per_page: perPage,
        page: page
      }
    })
    .then(res=>{
      console.log(res.data)
      setData(res.data)
      setIsShowDropDown(true)
      setIsError(false)
    })
    .catch(error=>{
      setIsError(true)
      if(error.response.status === 403) {
        setErrorData('Слишком много запросов')
      }
      if(error.response.status === 404) {
        setErrorData('Ошибка 404')
      }
      console.log('ошибка', error)
    })
  }

  useEffect(()=>{
    if(value.trim() !== '') {
      const delay = setTimeout(()=>getUsersLists(currentPage, perPage, value.trim()), 700)
      return ()=>clearTimeout(delay)
    }
    if (value === '') {
      setData({})
      setIsShowDropDown(false)
      setIsError(false)
    }
  }, [value, currentPage])

  useEffect(()=>{
    setCurrentPage(1)
  },[value])

  useEffect(()=>{
    if(isError) {
      setIsShowAlert(true)
    }
  },[isError])

  useEffect(()=>{
    if(isShowAlert) {
      const delay = setTimeout(()=>setIsShowAlert(false), 6000)
      return ()=>clearTimeout(delay)
    }
  },[isShowAlert])
  return (
    <>
      <div className="">
        <input
          className={s.input}
          type="text" 
          value={value}
          onChange={e=>setValue(e.target.value)}
          placeholder='Введите никнейм пользователя'
        />
      </div>
      {data?.total_count > 0 && <div className={s.subtext}><p>По запросу найдено: {data.total_count}</p></div>}
      {data?.total_count === 0 && <div className={s.subtext}><p>По вашему запросу ничего не найдено</p></div>}
      {isShowDropDown && data.total_count > 0 &&
        <div className={s.dropDown}>
            {data.items.map((item:IUser)=><User key={item.id} login={item.login} avatar_url={item.avatar_url}/>)}
            {Math.ceil(data.total_count / perPage) > 1 &&
             <div className={s.dropDown_btns}>
                <BtnTextPagination
                  text='Назад'
                  position={ImagePosition.LEFT}
                  handleClick={currentPage > 1 && !isError ? ()=>setCurrentPage(prev=>prev - 1) : undefined}
                />
                <BtnTextPagination
                  text='Вперёд'
                  position={ImagePosition.RIGHT}
                  handleClick={currentPage < Math.ceil(data.total_count / perPage) && !isError ? ()=>setCurrentPage(prev=>prev + 1) : undefined}
                />
             </div>
            }
        </div>}
        {isShowAlert && <Alert text={errorData}/>}
    </>
  )
}
