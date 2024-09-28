import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModalRequestPayment from '../modal/ModalRequestPayment'
import MainPayment from '../mainPayment/MainPayment'
import ListPayment from '../component/ListPayment'
import FindAllPayment from '../component/FindAllPayment'

const PublicRouterPayment = () => {
    return (
        <div>
            <Routes>
                <Route path='/createPayment/:id' element={<MainPayment />}>
                    </Route>
                <Route path='/payment' element={<FindAllPayment />}>
                    </Route>
            </Routes>
        </div>
    )
}

export default PublicRouterPayment
