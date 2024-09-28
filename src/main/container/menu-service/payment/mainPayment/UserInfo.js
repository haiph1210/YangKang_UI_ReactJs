import React from 'react'
import { useSelector } from 'react-redux'
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector'

const UserInfo = () => {
    const userRespone = useSelector(SelectTokenResponse).user;
  return (
    <div className='d-flex flex-column border p-4'>
        <div><h3><i>User Info</i></h3></div>
        <div>UserCode: {userRespone.userCode}</div>
        <div>FullName: {userRespone.fullName}</div>
        <div>Email: {userRespone.email}</div>
        <div>Gender:{userRespone.gender}</div>
      
      
    </div>
  )
}

export default UserInfo
