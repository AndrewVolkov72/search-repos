import React, { FC } from 'react'
import { IBtnNum } from '../../models/IBtnNum'
import s from './BtnNumPagination.module.css'

export const BtnNumPagination:FC<IBtnNum> = ({num, handleClick}) => {
  return (
    <button className={s.btn} onClick={handleClick}>{num}</button>
  )
}
