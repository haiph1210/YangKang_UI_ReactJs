import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { deleteMenu } from '../service/MenuService';
import _, { debounce } from 'lodash';

const ModalCheckRemove = ({show,onHide,id,name,afterRemove,data,isDelete}) => {
    const handleDelete = async(event) => {
        event.preventDefault();
        const res = await deleteMenu(id);
        if(res && res.responseData!== null) {
            onHide();
            loadDataAfterDelete();
            isDelete(true);
            toast.success(`Delete with id: ${id} and menu name: ${name} successfully`);
        }else{
            toast.success(`Delete with id: ${id} and menu name: ${name} false`);
        }
    }

    const loadDataAfterDelete = debounce(() => {
        const cloneMenu = _.clone(afterRemove);
        console.log(cloneMenu);
        const loadData = cloneMenu.filter(item => item.id !== id);
        console.log(loadData);
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
