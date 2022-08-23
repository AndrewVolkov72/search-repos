import React, { FC } from 'react'
import Image from '../../image/alert/alert-warning.svg'
import { IAlert } from '../../models/IAlert'
import s from './Alert.module.css'

export const Alert:FC<IAlert> = ({text}) => {
  return (
    <div className={s.item}>
      <img className={s.img} src={Image} alt="<!>" />
      <p className={s.text}>{text}</p>
    </div>
  )
}
