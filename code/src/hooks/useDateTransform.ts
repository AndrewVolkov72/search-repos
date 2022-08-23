import { useEffect, useState } from "react"

export const useDateTransform = (initValue:number) => {
  const [value, setValue] = useState<string>(String(initValue))

  useEffect(()=>{
    if(initValue < 10)setValue(`0${initValue}`)
    else setValue(`${initValue}`)
  },[initValue])

  return [value]
}