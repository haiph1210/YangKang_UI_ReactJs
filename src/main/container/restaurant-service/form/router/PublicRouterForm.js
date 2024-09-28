import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListForm from '../component/ListForm'

const PublicRouterForm = () => {
  return (
    <div>
      <Routes>
        <Route path='/form' element= {<ListForm></ListForm>}>
        </Route>
      </Routes>
    </div>
  )
}

export default PublicRouterForm
