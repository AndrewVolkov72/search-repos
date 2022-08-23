import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { routes } from '../routes';

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(item=><Route key={item.path} path={item.path} element={item.element}/>)}
      <Route path='*' element={<Home/>}/>
    </Routes>
  )
}
