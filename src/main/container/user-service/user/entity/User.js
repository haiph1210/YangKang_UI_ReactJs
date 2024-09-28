import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserDetailForm from '../modal/form-detail/UserDetailForm';
import { format } from 'date-fns';
import UserInfo from '../modal/user-info/UserInfo';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
const User = ({ id, username, userCode, fullName, email, address, birthDay, gender, status, role, createdDate, imgUrl }) => {
  const [isFormDetail, setIsFormDetail] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const formatBirthday = format(new Date(birthDay), 'dd/MM/yyyy');
  const formatCreatedDate = format(new Date(createdDate), 'dd/MM/yyyy hh-mm-ss');
  // chuyển trang
  const navigate = useNavigate();
  // sự kiện khi click vào hiện Detail
  const handleToGoDetail = (event) => {
    event.preventDefault();
    navigate(`/userInfo/${userCode}`)    
  }

  // sự kiện khi trỏ chuột vào hiện Detail-mini
  const handleOnMouseEnter = () => {
    console.log("trỏ vào");
    // setIsMouseEnter(true);
  }
  const handleOnMouseLeave = () => {
    // setIsMouseEnter(false);
  }


  return (
    <div className='d-sm-flex justify-content-center'>
      <Card style={{ width: '20rem', height: '27rem' }}
        onClick={handleToGoDetail}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <Card.Img variant="top" src={imgUrl}  alt={fullName} />
        <Card.Body>
          <Card.Title>{userCode}</Card.Title>
          <Card.Text>
            <div>
              <p>Sống tại: {address}</p>
            </div>
          </Card.Text>
          {/* <Button variant="primary" onClick={handleToGoDetail}>Go somewhere</Button> */}
        </Card.Body>
      </Card>
      {isFormDetail && (
        <UserInfo
          show={isFormDetail}
          onHide={() => setIsFormDetail(false)}
          id={id}
          username={username}
          userCode={userCode}
          fullName={fullName}
          email={email}
          address={address}
          birthDay={formatBirthday}
          gender={gender}
          status={status}
          role={role}
          createdDate={formatCreatedDate}
          imgUrl={imgUrl}
        />
      )}

      {isMouseEnter && (
        <UserDetailForm
          show={isMouseEnter}
          onHide={() => { }}
          fullName={fullName}
          address={address}
          birthDay={formatBirthday}
        />
      )}
    </div>
  )
}

export default User
