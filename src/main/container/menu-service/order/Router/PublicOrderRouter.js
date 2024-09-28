import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Order from '../entity/Order'
import ListOrder from '../component/ListOrder'

const PublicOrderRouter = () => {
  return (
    <div>
            <Routes >
            <Route path="/order" element={<ListOrder />}></Route>
            </Routes>
        </div>
  )
}

export default PublicOrderRouter
