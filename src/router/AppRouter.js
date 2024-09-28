import React from 'react'
import PublicRouterUser from '../main/container/user-service/user/router/PublicRouterUser'
import PublicRouterMenu from '../main/container/menu-service/menu/router/PubicRouterMenu'
import PublicRouterAuth from '../main/container/auth-service/Router/PublicRouterAuth'
import PublicRouterCart from '../main/container/menu-service/cart/router/PublicRouterCart'
import PublicRouterCombo from '../main/container/menu-service/combo/router/PubicRouterCombo'
import PublicRouterForm from '../main/container/restaurant-service/form/router/PublicRouterForm'
import PublicOrderRouter from '../main/container/menu-service/order/Router/PublicOrderRouter'
import PublicRouterPayment from '../main/container/menu-service/payment/routers/PublicRouterPayment'

const AppRouter = () => {
  return (
    <div>
      <PublicRouterMenu></PublicRouterMenu>
      <PublicRouterCombo></PublicRouterCombo>
      <PublicRouterCart></PublicRouterCart>
      <PublicOrderRouter></PublicOrderRouter>
      <PublicRouterPayment/>
      <PublicRouterForm></PublicRouterForm>
      <PublicRouterUser></PublicRouterUser>
      <PublicRouterAuth></PublicRouterAuth>
    </div>
  )
}

export default AppRouter
