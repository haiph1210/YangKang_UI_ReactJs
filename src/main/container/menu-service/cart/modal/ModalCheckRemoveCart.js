import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
import { deleteCart } from '../service/CartService';
import { toast } from 'react-toastify';
const ModalCheckRemoveCart = ({id,show,onHide,loadData}) => {
    const tokenRespone = useSelector(SelectTokenResponse);
    const deleteCartId = async() => {
        const res = await deleteCart(id);
        if(res && res.data.responseData) {
            onHide()
            toast.success(`Delete cart id: ${id} success`);
            loadData();
        }
    }
    const handleDelete = () => {
        deleteCartId();
    }
  return (
    
    <div>
          <div>
        <Modal show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Confirm deleting
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div>
            <p>Dear user<i> {tokenRespone.user.fullName}</i></p>
            <p>You Can Delete Cart ID: {id}</p>
            <p>This action may cause data loss, Choose button remove to delete {id} or close to exit</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-danger' onClick={(event) =>handleDelete(event)}
          >
           <i class="fa-sharp fa-solid fa-trash"></i>&nbsp;Remove</Button>
          <Button onClick={onHide}>
          <i class="fas fa-times-circle"></i>&nbsp;Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  )
}

export default ModalCheckRemoveCart
