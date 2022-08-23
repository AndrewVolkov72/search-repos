import React, { useState } from 'react'
import UserLogo from '../../image/user/avatar.svg'
import Arrow from '../../image/user/arrow_full.svg'
import ArrowBorder from '../../image/user/arrow_border.svg'
import s from './UserProfile.module.css'
import { BtnLogOut } from '../BtnLogOut/BtnLogOut'
import auth from '../../store/auth'

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={s.wrapper}>
      <div className={s.user}>
        <p className={s.name}>{auth.userEmail}</p>
        <div className={s.user_content}>
          <button onClick={()=>setIsOpen(prev=>!prev)} className={s.btn}><img className={s.logo} src={UserLogo} alt="Пользователь" /></button>
          <button onClick={()=>setIsOpen(prev=>!prev)} className={s.btn}><img className={isOpen ? [s.arrow, s.active].join(' ') : s.arrow} src={Arrow} alt="^" /></button>
        </div>
      </div>
      {isOpen && <div className={s.drop_down}>
        <img className={s.drop_arrow} src={ArrowBorder} alt="" />
        <BtnLogOut/>
      </div>}
    </div>
    
  )
}
