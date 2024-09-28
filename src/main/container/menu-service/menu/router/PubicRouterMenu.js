import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../../home/Home'
import UserMenuRoleRouter from './AdminMenu'

const PublicRouterMenu = () => {
    return (
        <div>
            <Routes>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/menu' element={<UserMenuRoleRouter />}></Route>
            </Routes>
        </div>
    )
}

export default PublicRouterMenu
