import React, { FC, useState } from 'react'
import { ReactComponent as EyeOpen } from '../../image/form/eye-open.svg'
import { ReactComponent as EyeClose } from '../../image/form/eye-close.svg'
import s from './Form.module.css'
import { IForm } from '../../models/IForm'

export const Form:FC<IForm> = ({title, handleClick}) => {
  const [loginValue, setLoginValue] = useState<string>('')
  const [pasValue, setPasValue] = useState<string>('')
  const [isShowPas, setIsShowPas] = useState<boolean>(false)

  return (
      <form className={s.form} onSubmit={e=>e.preventDefault()}>
        <div className={s.form_header}>
          <p className={s.title}>{title}</p>
        </div>
        <div className={s.content}>
          <div className={s.wrapper}>
            <input
              className={s.input}
              type="text"
              value={loginValue}
              onChange={e=>setLoginValue(e.target.value)}
              placeholder='Введите ваш e-mail'
            />
          </div>
          <div className={[s.wrapper, s.wrapper_pas].join(' ')}>
            <input
              className={s.input}
              type={isShowPas ? "text" : "password"}
              value={pasValue}
              onChange={e=>setPasValue(e.target.value)}
              placeholder='Введите пароль'
            />
            {isShowPas
            ? <button className={s.btnPas} onClick={()=>setIsShowPas(false)}><EyeOpen/></button>
            : <button className={s.btnPas} onClick={()=>setIsShowPas(true)}><EyeClose/></button>}
          </div>
          <button className={s.btn} onClick={()=>handleClick(loginValue, pasValue)}>Подтвердить</button>
        </div>
      </form>
  )
}
