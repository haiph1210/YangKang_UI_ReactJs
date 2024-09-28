import { Modal } from 'react-bootstrap'
import React from 'react'
import { Button } from 'react-bootstrap'
import { updateAvartar } from '../../../service/UserService'
import { toast } from 'react-toastify'

const ModalUpdateAvartar = ({ show, onHide, imgUpdate, username, imgNow, showFile, loadData }) => {
    const handleConfirm = async () => {
        const res = await updateAvartar(username, imgUpdate);
        console.log(res);
        if (res && res.data.responseData) {
            toast.success(res.data.responseData);
            loadData();

        }
    }

    const handleUpdate = () => {
        showFile();
    }
    return (
        <div>
            <Modal show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header onHide>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Avatar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='d-sm-flex justify-content-around'>

                        <img
                            src={imgNow}
                            className='rounded-circle'
                            alt={imgUpdate}
                            height={"200px"}
                            // style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-success' onClick={handleUpdate}>
                    <i class="fa-solid fa-user-tie"></i>&nbsp;UpdateAvartar</Button>
                    <Button className='btn btn-success' onClick={handleConfirm}>
                    <i class="fa-solid fa-check"></i>&nbsp;Confirm</Button>
                    <Button onClick={onHide}>
                        <i class="fas fa-times-circle"></i>&nbsp;Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalUpdateAvartar
