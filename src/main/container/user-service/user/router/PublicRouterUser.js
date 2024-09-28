import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListUser from '../container/ListUser'
import UserInfo from '../modal/user-info/UserInfo'
import PrivateRouterAuthAdmin from '../../../auth-service/Router/PrivateRouterAuthAdmin'

const PublicRouterUser = () => {
    return (
        <div>
            <Routes >
            <Route path='/user' element={<PrivateRouterAuthAdmin><ListUser/></PrivateRouterAuthAdmin>}></Route>
            <Route path="/userInfo/:id" element={<UserInfo />}></Route>
            </Routes>
        </div>
    )
}

export default PublicRouterUser
