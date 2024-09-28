import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import '../slider/Slider.scss';
import AppRouter from '../../router/AppRouter';
import Header from '../header/Header';
import { NavDropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';
import { useSelector } from 'react-redux';
import { SelectAuth, SelectTokenResponse } from '../container/auth-service/redux/AuthSelector';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faListDropdown } from '@fortawesome/free-solid-svg-icons';
const Slider = () => {
    const [showSlider, setShowSlider] = useState("");
    const isAuth = useSelector(SelectAuth);
    const tokenResponse = useSelector(SelectTokenResponse);
    const handleOnClick = (value) => {
        console.log(value);
        setShowSlider(value);
    }

    return (
        <div className='full'>
            <div className='header'>
                <Header
                    onClickHideOrShow={handleOnClick}
                />
            </div>

            <div className="slider-container">
                {showSlider && (
                    <div className="slider">
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <NavLink to={'/home'} className="nav-link">
                                <i class="fa-solid fa-house"></i>&nbsp;
                                Home Page
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title={<span> <i class="fa-solid fa-cart-shopping"></i> Menu Manager</span>} id="basic-nav-dropdown">
                                <NavDropdown.Item className='fix-lenght'>
                                    <NavLink
                                        to={"/menu"}
                                        className={"nav-link"} >
                                        <i class="fa-solid fa-list-ol"></i>
                                        &nbsp;
                                        Menu</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/combo"} className={"nav-link"} >
                                        <i class="fa-solid fa-list-check"></i>
                                        &nbsp;
                                        Combo</NavLink>
                                </NavDropdown.Item>
                                {isAuth
                                ?<>
                                 <NavDropdown.Item>
                                    <NavLink to={"/order"} className={"nav-link"} >
                                        <i class="fa-solid fa-cart-arrow-down"></i>
                                        &nbsp;
                                        Order</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/payment"} className={"nav-link"} >
                                        <i class="fa-solid fa-calculator"></i>
                                        &nbsp;
                                        Payment</NavLink>
                                </NavDropdown.Item>
                                </>
                                : null}
                               
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <NavDropdown title={<span> <i class="fa-solid fa-hotel"></i> Restaurant Manager</span>} id="basic-nav-dropdown">
                                <NavDropdown.Item className='fix-lenght'>
                                    <NavLink
                                        to={"/info"}
                                        className={"nav-link"} >
                                        <i class="fa-solid fa-house-chimney"></i>
                                        &nbsp;
                                        Info</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/detail"} className={"nav-link"} >
                                        <i class="fa-regular fa-rectangle-list"></i>
                                        &nbsp;
                                        Detail</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/masterial"} className={"nav-link"} >
                                        <i class="fa-solid fa-utensils"></i>

                                        &nbsp;
                                        Masterial</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/form"} className={"nav-link"} >
                                        <i class="fa-solid fa-table-list"></i>
                                        &nbsp;
                                        Form</NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {(tokenResponse && isAuth !== true && tokenResponse.user.role !== 'ADMIN')
                            ?
                            ''
                            :
                            <Nav>
                                <NavDropdown title={<span> <i class="fa-solid fa-hotel"></i> User-Manager</span>} id="basic-nav-dropdown">
                                    {(tokenResponse && isAuth !== true && tokenResponse.user.role !== 'ADMIN')
                                        ?
                                        <NavDropdown.Item className='fix-lenght'>
                                            <NavLink
                                                to={`/userInfo/${tokenResponse.user.userCode}`}
                                                className={"nav-link"}
                                            >
                                                <i class="fa-solid fa-house-chimney"></i>
                                                &nbsp;

                                                UserInfo</NavLink>
                                        </NavDropdown.Item>
                                        :
                                        (<>
                                            <NavDropdown.Item className='fix-lenght'>
                                                <NavLink
                                                    to={"/user"}
                                                    className={"nav-link"} >
                                                    <i class="fa-solid fa-house-chimney"></i>
                                                    &nbsp;
                                                    User</NavLink>
                                            </NavDropdown.Item>

                                            <NavDropdown.Item className='fix-lenght'>
                                                <NavLink
                                                    to={`/userInfo/${tokenResponse.user.userCode}`}
                                                    className={"nav-link"}
                                                >
                                                    <i class="fa-solid fa-house-chimney"></i>
                                                    &nbsp;

                                                    UserInfo</NavLink>
                                            </NavDropdown.Item>
                                        </>)

                                    }



                                </NavDropdown>
                            </Nav>}

                            {(tokenResponse && isAuth !== true && tokenResponse.user.role !== 'ADMIN')
                            ?
                            ''
                            :
                            <Nav>
                                <NavDropdown title={<span> <i class="fa-solid fa-hotel"></i> Employee-Manager</span>} id="basic-nav-dropdown">
                                    {(tokenResponse && isAuth !== true && tokenResponse.user.role !== 'ADMIN')
                                        ?
                                        <NavDropdown.Item className='fix-lenght'>
                                            <NavLink
                                                to={`timeSheetingDay`}
                                                className={"nav-link"}
                                            >
                                                <i class="fa-solid fa-house-chimney"></i>
                                                &nbsp;

                                                TimeSheetingDay</NavLink>
                                        </NavDropdown.Item>
                                        :
                                        (<>
                                            <NavDropdown.Item className='fix-lenght'>
                                                <NavLink
                                                    to={"/position"}
                                                    className={"nav-link"} >
                                                    <i class="fa-solid fa-house-chimney"></i>
                                                    &nbsp;
                                                    Position</NavLink>
                                            </NavDropdown.Item>

                                          
                                        </>)

                                    }



                                </NavDropdown>
                            </Nav>}

                    </div>
                )}

                
                <div className={`${showSlider === true ? 'main' : 'centered'}`}>
                    <div className='container'><AppRouter /></div>

                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>

        </div>
    );
};

export default Slider;
