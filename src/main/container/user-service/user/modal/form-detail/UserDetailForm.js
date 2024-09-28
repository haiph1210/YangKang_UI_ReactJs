import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../form-detail/UserDetailForm.scss'
const UserDetailForm = ({ show, onHide, id, username, userCode, fullName, email, address, birthDay, gender, status, role, createdDate, imgUrl }) => {
    return (
        <div>
            <Modal show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Thông Tin Người Dùng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='d-sm-flex justify-content-around'>
                        <div className="d-sm-flex flex-sm-column ">
                            <img
                                src={imgUrl}
                                className='rounded-circle'
                                alt={fullName}
                                height={"200px"}
                            />
                        </div>
                        <div className='d-sm-flex flex-column'>
                            <p>Id: {id}</p>
                            <div className='d-sm-flex justify-content-betweent'>
                                <p>Username Or UserCode: </p>
                                <p className='ms-2'>{username}</p>
                                <p className='ms-2'> - </p>
                                <p className='ms-2'>{userCode}</p>
                            </div>
                            <p>FullName: {fullName}</p>
                            <p>Email: {email}</p>
                            <p>Address: {address}</p>
                            <p>BirthDay: {birthDay}</p>
                            <p>Gender: {gender==="MALE"? "Nam" : "Nữ"}</p>
                            <p>Status: {status==="ACTIVE" ? "Đã Kích Hoạt" : "Chưa Kích Hoạt"}</p>
                            <p>Role: {role==="USER" ? "Quyền Người Dùng": "Quyền Quản Trị"}</p>
                            <p>CreatedDate: {createdDate}</p>


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className='btn btn-success' onClick={savingOrder}
            >
              <i class="fas fa-cart-plus"></i>&nbsp;Thêm Vào Giỏ Hàng</Button> */}
                    <Button onClick={onHide}>
                        <i class="fas fa-times-circle"></i>&nbsp;Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserDetailForm
