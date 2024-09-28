import React, { useState } from 'react'
import CustomeInput from '../../../input/CustomeInput'
import {  validatePassword, validateRequire } from '../../../input/ValidateConfig';
import '../../../container/auth-service/entity/Login.scss'
import {  useNavigate } from 'react-router-dom';
import { APIChangePassword } from '../service/AuthService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SelectTokenResponse } from '../redux/AuthSelector';
import { LogOutAction } from '../redux/AuthAction';
const ChangePassword = () => {
        const [inputPassword, setInputPassword] = useState("");
        const [isShowPassword, setIsShowPassword] = useState(false);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const tokenResponse = useSelector(SelectTokenResponse);

        
        const handleInputPassword = (value) => {
            setInputPassword(value);
        }

        const handleLogin = async(event) => {
            event.preventDefault();
            const res = await APIChangePassword(tokenResponse.user.username,inputPassword);
            if(res && res.responseData) {
                toast.success("Change Password Success,We will log out and you login to YangKang to use");
                dispatch(LogOutAction())
                navigate("/login")
            }
        }
        
        const hanldeBack = () => {
            navigate("/home")
        }
        const handlePressEnter = (event) => {
            if (event && event.key === "Enter") {
            handleLogin()
            }
        }
  return (
    <div>
     <div className=''>
      <div className='login-container col-12 col-sm-4 border'>
        <div className='m-5'>
          <div className='title'>Change-Password</div>
          <div className='input-2'>
            <CustomeInput
              lable="Password: "
              type={isShowPassword === true ? 'text' : 'password'}
              value={inputPassword}
              placeholder="Input Password"
              onChange={handleInputPassword}
              validate={validatePassword}
              onKeyDown={(event) => handlePressEnter(event)}
            />
            <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
              onClick={() => setIsShowPassword(!isShowPassword)}
            ></i>

          </div>
          <div>
            <button
              className={ inputPassword ? 'active' : ''}
              disabled={ inputPassword ? false : true}
              onClick={handleLogin}
            >
              {<i className='fa-solid fa-sync fa-spin'></i>}
              &nbsp;Change-Password</button>
          </div>
          <div className='back'>
            <i className='fa-solid fa-angles-left'></i>
            <span onClick={() => hanldeBack()}>&nbsp;GoBack</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChangePassword

