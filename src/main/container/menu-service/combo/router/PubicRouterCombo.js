import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListCombos from '../component/ListCombo'

const PublicRouterCombo = () => {
    return (
        <div>
            <Routes>
                <Route path='/combo' element={<ListCombos />}></Route>
            </Routes>
        </div>
    )
}

export default PublicRouterCombo
