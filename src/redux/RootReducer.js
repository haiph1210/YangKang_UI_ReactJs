import React from 'react'
import {combineReducers} from 'redux'
import UserReducer from '../main/container/user-service/user/redux/UserReducer'
import AuthReducer from '../main/container/auth-service/redux/AuthReducer'
import RegisterReducer from '../main/container/auth-service/redux/RegisterReducer'
import FormReducer from '../main/container/restaurant-service/form/redux/FormReducer'
import OrderReducer from '../main/container/menu-service/order/redux/OrderReducer'
import PaymentReducer from '../main/container/menu-service/payment/redux/PaymentReducer'
const RootReducer = combineReducers({
    user: UserReducer,
    auth: AuthReducer,
    authRegister : RegisterReducer,
    form: FormReducer,
    order: OrderReducer,
    payment: PaymentReducer,
})


export default RootReducer
