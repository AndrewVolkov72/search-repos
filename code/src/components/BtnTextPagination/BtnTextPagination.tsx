import React, { FC } from 'react'
import { IBtnText, ImagePosition } from '../../models/IBtnText'
import { ReactComponent as Arrow } from '../../image/arrow.svg'
import s from './BtnTextPagination.module.css'

export const BtnTextPagination:FC<IBtnText> = ({text, handleClick, position}) => {
  return (
    <button
      className={position === ImagePosition.LEFT ? [s.btn, s.left].join(' ') : s.btn}
      onClick={handleClick}
    >
      {text}
      <Arrow className={position === ImagePosition.LEFT ? [s.arrow, s.rotate].join(' ') : [s.arrow, s.right].join(' ')}/>
    </button>
  )
}
