import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { createCart, updateCart } from '../../cart/service/CartService';
import { useSelector } from 'react-redux';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';

const AddToCart = ({ code,id, show, onHide, name, isSuccess,isUpdate ,loadData}) => {
  const [amount, setAmount] = useState(0);
  const tokenRespone = useSelector(SelectTokenResponse);
  const handlePlus = () => {
    setAmount(amount+1);
  }
  const addCart = async () => {
    const userCode = tokenRespone.user.userCode;
    try {
      if(isUpdate ===true) {
        const res = await updateCart(id,userCode,code, amount);
        console.log(res);
        if (res && res.data.responseData) {
          onHide();
          toast.success(`Add ${name} to cart success`);
          loadData()
        }
      }else{
        const res = await createCart(userCode,code, amount);
        console.log(res);
        if (res && res.data.responseData) {
          onHide();
          toast.success(`Add ${name} to cart success`);
          isSuccess()
        } else {
          toast.error(`${name} add to cart failed`);
        }
      }
     
    } catch (error) {
      toast.error('An error occurred while adding to cart. Please try again later.');
    }
  };
  

  const handleMinus = () => {
    setAmount(amount-1);
  }
  const savingOrder = () => {
    addCart();
   
  }
  return (
    <div>
      <Modal show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Amount {name} you want add to cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label>Amount:</label>
          <div className='d-flex justify-content'>
              <button onClick={handlePlus}><i class="fa-solid fa-plus"></i></button>
            {amount}
            <button onClick={handleMinus}><i class="fa-solid fa-minus"></i></button>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-success' onClick={savingOrder}
          >Đồng Ý</Button>
          <Button onClick={onHide}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddToCart
