import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../footer/Footer.scss'
import logoCard from '../../asset/img/logo-ngan-hang.jpg';
import logoTranslate from '../../asset/img/chuyen-phat-nhanh.jpg';

const Footer = ({ }) => {

  return (
    <div className='footer'>
      <div>
      <div className='d-sm-flex flex-sm-column bd-highlight border-bottom-1-solid'>
        <Navbar bg="light" expand="lg">
          <Container>
            <div>
              <ul className='list-unstyled custom-color'>
                <li><NavLink to={"/home"} className={"nav-link"} >YangKangPage</NavLink></li>
                <li><NavLink to={"/user"} className={"nav-link"} >Add New User Sell</NavLink></li>
                <li><NavLink to={"/info"} className={"nav-link"} >Contact Us</NavLink></li>
                <li><NavLink to={"/info"} className={"nav-link"} >YangKang Info</NavLink></li>
                <li><NavLink to={"/"} className={"nav-link"} >Phone</NavLink></li>
              </ul>
            </div>
            <div>
              <ul className='list-unstyled custom-color'>
                <li><NavLink to={"/home"} className={"nav-link"} >Payment By</NavLink></li>
                <li><img src={logoCard} width={"270px"} height={"200px"} alt='logo-card' /></li>
              </ul>
            </div>
            <div>
              <ul className='list-unstyled custom-color'>
                <li><NavLink to={"/home"} className={"nav-link"}>Transport</NavLink></li>
                <li><img src={logoTranslate} width={"270px"} height={"200px"} alt='logo-card' /></li>
              </ul>
            </div>
          </Container>
        </Navbar >
      </div >
      </div>
      <hr></hr>
      <div className='d-flex justify-content-center font-italic'>
        <div>@YangKang-2023</div>
        <div className='ms-3 '>@admin: haiph12102001@gmail.com</div>
      </div>
      
    </div>
  )
}

export default Footer
