import React, { useState } from 'react'
import CustomeInput from '../../../input/CustomeInput'
import { validateDate, validateEmail, validatePassword, validatePhoneNumber, validateRequire } from '../../../input/ValidateConfig';
import '../../../container/auth-service/entity/Register.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { APILogin } from '../../auth-service/service/AuthService'
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/AuthAction';
import { toast } from 'react-toastify';
import { SelectTokenResponse } from '../redux/AuthSelector';
import { RegisterAction } from '../redux/RegisterAction';

const Register = () => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [inputFirstName, setInputFirstName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");
    const [inputBirthday, setInputBirthday] = useState("");
    const [inputGender, setInputGender] = useState("");
    const [inputImgUrl, setInputImgUrl] = useState("");

    


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenResponse = useSelector(SelectTokenResponse);

    const handleInputPassword = (value) => {
        setInputPassword(value);    
    }

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(
            RegisterAction(
                inputUsername,
                inputPassword,
                inputFirstName,
                inputLastName,
                inputEmail,
                inputPhoneNumber,
                inputAddress,
                inputBirthday,
                inputGender))

    }

    const hanldeBack = () => {
        navigate("/home")
    }
    const handlePressEnter = (event) => {
        if (event && event.key === "Enter") {
            handleRegister()
        }
    }
    return (
        <div>
            <div className=''>
                <div className='login-container col-12 col-sm-4 border'>
                    <div className='m-5'>
                        <div className='title'>Register</div>
                        <CustomeInput
                            lable="Username: "
                            type="text"
                            value={inputUsername}
                            placeholder="Input Username"
                            onChange={(value) => setInputUsername(value)}
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
                        <CustomeInput
                            lable="First Name: "
                            type="text"
                            value={inputFirstName}
                            placeholder="Input First Name"
                            onChange={(value) => setInputFirstName(value)}
                            validate={validateRequire}
                        />

                        <CustomeInput
                            lable="Last Name: "
                            type="text"
                            value={inputFirstName}
                            placeholder="Input Last Name"
                            onChange={(value) => setInputLastName(value)}
                            validate={validateRequire}
                        />
                        <CustomeInput
                            lable="Email: "
                            type="text"
                            value={inputEmail}
                            placeholder="Input Email"
                            onChange={(value) => setInputEmail(value)}
                            validate={validateEmail}
                        />
                        <CustomeInput
                            lable="Address: "
                            type="text"
                            value={inputAddress}
                            placeholder="Input Address"
                            onChange={(value) => setInputAddress(value)}
                            validate={validateRequire}
                        />
                        <CustomeInput
                            lable="PhoneNumber: "
                            type="text"
                            value={inputPhoneNumber}
                            placeholder="Input PhoneNumber"
                            onChange={(value) => setInputPhoneNumber(value)}
                            validate={validatePhoneNumber}
                        />
                        <CustomeInput
                            lable="Birth Day: "
                            type="date"
                            value={inputBirthday}
                            placeholder="Input Birth Day"
                            onChange={(value) => setInputBirthday(value)}
                            validate={validateDate}
                        />
                        <div className='d-flex flex-column mb-4'>
                            <label>Gender</label>
                            <select value={inputGender} onChange={(event) => setInputGender(event.target.value)}>
                                <option value="">-- Chọn một giá trị --</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>
                        <div>
                            <button
                                className={inputPassword ? 'active' : ''}
                                disabled={inputPassword ? false : true}
                                onClick={handleRegister}
                            >
                                {<i className='fa-solid fa-sync fa-spin'></i>}
                                &nbsp;Register</button>
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

export default Register
