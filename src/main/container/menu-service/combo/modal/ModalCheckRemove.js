import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { deleteCombo, deleteMenu } from '../service/ComboService';
import _, { debounce } from 'lodash';

const ModalCheckRemove = ({show,onHide,id,name,afterRemove,data}) => {
    const handleDelete = async(event) => {
        event.preventDefault();
        const res = await deleteCombo(id);
        if(res && res.responseData!== null) {
            onHide();
            loadDataAfterDelete();
            toast.success(`Delete with id: ${id} and combo name: ${name} successfully`);
        }else{
            toast.success(`Delete with id: ${id} and combo name: ${name} false`);
        }
    }

    const loadDataAfterDelete = debounce(() => {
        const cloneCombo = _.clone(afterRemove);
        const loadData = cloneCombo.filter(item => item.id !== id);
        data(loadData)
      })
  return (
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
            <p><b>Dear</b></p>
            <p>You Can Delete Menu Name: <i>{name}</i></p>
            <p>This action may cause data loss, Choose button remove to delete <i>{name}</i> or close to exit</p>
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
  )
}

export default ModalCheckRemove
