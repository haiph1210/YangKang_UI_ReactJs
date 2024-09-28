import React from 'react'
import ListCart from '../component/ListCart'
import { Route, Routes } from 'react-router-dom'

const PublicRouterCart = () => {
  return (
    <div>
         <Routes>
                <Route path='/cart' element={<ListCart />}></Route>
        </Routes>
      
    </div>
  )
}

export default PublicRouterCart
