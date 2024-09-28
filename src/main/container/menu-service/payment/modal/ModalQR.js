import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import imgBidv from '../../../../../asset/img-QR-BANKING/QRCode_BIDV.jpg'

const ModalQR = ({ show, onHide }) => {

    return (
        <div>
            <div>
                <Modal show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton={onHide}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            QR CODE
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <form className='border form-search'>
                            <div className='d-flex justify-content-center align-item-center'>
                            <img
                            src={imgBidv}
                            alt='Card BIDV IN RESTAURANT'
                            width={'300px'}
                            height={'300px'}
                            />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>
                            <i class="fas fa-times-circle"></i>&nbsp;Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default ModalQR
