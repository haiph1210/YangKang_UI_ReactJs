import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Votting from '../../menu/modal/Votting';
import { createCart } from '../../cart/service/CartService';
import AddToCart from './AddToCart';
import ModalRequestOrder from '../../order/modal/ModalRequest';
const ModalCombo = ({ id, name,code, price, imgUrl, description,totalStarInTotalUser, show, onHide ,loadData}) => {
  const [getImgUrl, setGetImgUrl] = useState("");
  const [votting,setVotting] =useState(false);
  const [addToCart,setAddToCart] = useState(false);
  const [showModal, setShowModal] = useState(show);
  const [order,setOrder] = useState(false);
  const [isUpdate,setIsUpdate] = useState(false);
  const addCart = async () => {
    const res = await createCart();
  }
  const hideModal = () => {
    setShowModal(!show);
  }
  const comeBackShow = () => {
    setShowModal(show);
  }
  const savingAddCart = () => {
    setAddToCart(true);
    hideModal();
  }
  useEffect(() => {
    const fetchData = async () => {
      const base64Image = await imgUrl();
      setGetImgUrl(base64Image);
    };

    fetchData();
  }, [imgUrl]);

  const handleVotting = () => {
    setVotting(true);
  }
  
  const handleOrder = () => {
    setOrder(true);
    hideModal();
  }

  return (
    <div>
      <Modal show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
       
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thông Tin Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='d-sm-flex justify-content-around'>
            <div className="d-sm-flex flex-sm-column ">
              {Array.isArray(getImgUrl) && getImgUrl.map((imgUrl, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${imgUrl}`}
                  alt={`Image ${index + 1}`}
                  width={"350px"} 
                  height={"200px"}
                  style={{ marginBottom: "10px" }}
                  className='d-sm-flex '
                />
              ))}
            </div>
            <div className='d-sm-flex flex-column'>
              <h4>{name}</h4>
              <p>Giá của sản phẩm: {price} vnđ</p>
              <p>Thông Tin Sản Phẩm: {description}</p>
              <p>Số lượt vote: {totalStarInTotalUser}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button className='btn btn-dark' onClick={handleVotting}
          >
            <i class="fa-solid fa-comment"></i>&nbsp;Vote</Button>
            <Button className='btn btn-warning' onClick={handleOrder}
          >
            <i class="fa-solid fa-list"></i>&nbsp;Đặt Hàng</Button>

          <Button className='btn btn-success' onClick={savingAddCart}
          >
            <i class="fas fa-cart-plus"></i>&nbsp;Thêm Vào Giỏ Hàng</Button>
          <Button onClick={onHide}>
          <i class="fas fa-times-circle"></i>&nbsp;Close</Button>
        </Modal.Footer>
      </Modal>
      {votting && (
        <Votting
        show={votting}
        onHide={() => setVotting(false)}
        name={name}
        id = {id}
        totalStarInTotalUser= {totalStarInTotalUser}
        loadData = {loadData}
        ></Votting>
      )}
      {addToCart && (
        <AddToCart
        code={code}
        show={addToCart}
        onHide={() => setAddToCart(false)}
        name={name}
        isSuccess={comeBackShow}
        />
      )}
      {order && (
        <ModalRequestOrder
        show={order}
        onHide={() => setOrder(false)}
        isSuccess={comeBackShow}
        />
      )} 
    </div>
  )
}

export default ModalCombo
