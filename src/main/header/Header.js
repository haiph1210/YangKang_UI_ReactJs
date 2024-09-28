import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../asset/img/dev-logo.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import '../header/Header.scss';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAuth, SelectTokenResponse } from '../container/auth-service/redux/AuthSelector';
import { LogOutAction } from '../container/auth-service/redux/AuthAction';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { total } from '../container/menu-service/cart/service/CartService';

const Header = ({ onClickHideOrShow }) => {
  const [totalCarts,setTotalCarts] = useState(0);
  const isAuth = useSelector(SelectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hideSlider, setHideSlider] = useState(false);
  const tokenResponse = useSelector(SelectTokenResponse);
  
  const fetchTotalCart = async () => {
    try {
      const totalCart = await total(tokenResponse.user.userCode);
      if (totalCart && totalCart.data.responseData) {
        setTotalCarts(totalCart.data.responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTotalCart();
  },[])
 

  const handleUpdateHide = (event) => {
    event.preventDefault();
    setHideSlider(false);
    onClickHideOrShow(hideSlider);
  };

  const handleUpdateShow = (event) => {
    event.preventDefault();
    setHideSlider(true);
    onClickHideOrShow(hideSlider);
  };

  const handleLogOut = () => {
    dispatch(LogOutAction());
    navigate("/home");
    toast.success(`Log Out Success, GoodBye ${tokenResponse.user.fullName} , See You Again`);

  };


  return (
    <div className='d-sm-flex flex-sm-column bd-highlight mb-3'>
      <Navbar bg="light" expand="lg">
        <Container>
          <div className='hide-show'>
            {hideSlider ? (
              <Button
                className='hideSlider'
                variant=""
                onClick={handleUpdateHide}
              >
                <i className="fa-solid fa-grip-lines"></i>&nbsp;
              </Button>
            ) : (
              <Button
                className='showSlider'
                variant=""
                onClick={handleUpdateShow}
              >
                <i className="fa-solid fa-grip-lines-vertical"></i>&nbsp;
              </Button>
            )}
          </div>
          <NavLink to={"/home"} className={"nav-link"}>
            <Navbar.Brand>
              <img
                src={logo}
                width={"30"}
                height={"30"}
                className='d-inline-block align-top'
                alt="YangKangLogo"
              />
              <span>YangKang</span>
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/home"} className={"nav-link"}>HomePage</NavLink>
              <NavLink to={"/menu"} className={"nav-link"}>Menu</NavLink>
              <NavLink to={"/combo"} className={"nav-link"}>Combo</NavLink>
              {isAuth
              ?
              <>
              <NavLink to={"/order"} className={"nav-link"}>Order</NavLink>
              <NavLink to={"/payment"} className={"nav-link"}>Payment</NavLink>
              </>
              :
              null}
            </Nav>
            {isAuth
              ? <Nav>
                <NavLink to={"/cart"} className={"nav-link"}><div>
                  <div className='icon-cart'><i class="fa-solid fa-cart-shopping"></i>
                  <div className='total-cart'>{totalCarts}</div>
                  </div>
                  
                  </div></NavLink>
                </Nav>
              :
              null
            }

            <Nav>
              <NavDropdown title={isAuth && tokenResponse ? tokenResponse.user.fullName : "Setting"} id="basic-nav-dropdown">
                {isAuth === null ? (
                  <>
                    <NavDropdown.Item>
                      <NavLink to={"/login"} className={"nav-link"}>Login</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to={"/register"} className={"nav-link"}>Register</NavLink>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <NavDropdown.Item onClick={() => handleLogOut()}>LogOut</NavDropdown.Item>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to={"/change-password"} className={"nav-link"}>Change Password</NavLink>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
