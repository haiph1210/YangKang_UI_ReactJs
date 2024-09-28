import React, { useState } from 'react'
import CustomeInput from '../../../input/CustomeInput'
import { validateEmail, validatePassword, validatePhoneNumber, validateRequire } from '../../../input/ValidateConfig';
import '../../../container/auth-service/entity/Login.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { APILogin } from '../../auth-service/service/AuthService'
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/AuthAction';
import { toast } from 'react-toastify';
import { SelectTokenResponse } from '../redux/AuthSelector';
const Login = () => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();

  const resToken = useSelector(SelectTokenResponse);
  const handleInputUsername = (value) => {
    setInputUsername(value);
  }

  const handleInputPassword = (value) => {
    setInputPassword(value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!inputUsername || !inputPassword) {
      toast.error("Username/Password is required!");
      return;
    }

    (dispatch(LoginAction(inputUsername, inputPassword, () => {
      setTimeout(() => {
        navigate("/home")
      },1500)
    })))
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
    <div className=''>
      <div className='login-container col-12 col-sm-4 border'>
        <div className='m-5'>
          <div className='title'>Login</div>
          <CustomeInput
            lable="Username: "
            type="text"
            value={inputUsername}
            placeholder="Input Username"
            onChange={handleInputUsername}
            validate={validateRequire}
          />
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
              className={inputUsername && inputPassword ? 'active' : ''}
              disabled={inputUsername && inputPassword ? false : true}
              onClick={handleLogin}
            >
              {<i className='fa-solid fa-sync fa-spin'></i>}
              &nbsp;Login</button>
          </div>
          <div className='d-sm-flex justify-content-sm-around'>
            <NavLink to="/change-password">Forget Password</NavLink>
            <NavLink to="/change-password">Login With SMS</NavLink>
          </div>
          <div className='d-sm-flex justify-content-sm-around border-top mt-2'>
            <button className='btn border' onClick={handleLogin}><i class="fa-brands fa-facebook"></i>&nbsp;FaceBook</button>
            <button className='btn border' onClick={handleLogin}><i class="fa-brands fa-google"></i>&nbsp;Google</button>
          </div>

          <div className='d-sm-flex justify-content-around'>
            <div className='register'>You want create new user YangKang
              <NavLink
                to='/register'
              > Register</NavLink></div>
          </div>
          <div className='back'>
            <i className='fa-solid fa-angles-left'></i>
            <span onClick={() => hanldeBack()}>&nbsp;GoBack</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
