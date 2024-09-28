import React from 'react'
import Login from '../entity/Login'
import { Route, Routes } from 'react-router-dom'
import ChangePassword from '../entity/ChangePassword'
import Register from '../entity/Register'
import PrivateRouterAuth from './PrivateRouterAuth'

const PublicRouterAuth = () => {
    return (
        <div>
            <Routes >
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register  />}></Route>

                <Route path='/change-password' element={<PrivateRouterAuth>
                    <ChangePassword/>
                </PrivateRouterAuth>}></Route>
            </Routes>
        </div>
    )
}

export default PublicRouterAuth
