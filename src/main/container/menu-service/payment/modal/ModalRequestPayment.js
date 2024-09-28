import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
import ModalQR from './ModalQR';
import { createPaymentAction, createPaymentByVNPAYAction } from '../redux/PaymentAction';
import { useNavigate, useParams } from 'react-router-dom';

const ModalRequestPayment = ({id}) => {
    const [status, setStatus] = useState();
    const [customePay, setCustomePay] = useState();
    const [discountId, setDiscountId] = useState(1);
    const [showOR, setShowQR] = useState(false);
    const tokenResponse = useSelector(SelectTokenResponse);
    const dispatch = useDispatch()
    const handleRequest = () => {
        const userCode = tokenResponse.user.userCode;
        dispatch(createPaymentAction(userCode, id, discountId, customePay, status));
    }

    useEffect(() => {
        let QR = "QR";
        let CASH = "CASH";
        let BANK = "BANK";
        if (status === QR) {
            setShowQR(true);
        } if (status === CASH) {
        } else {
 
        }
    }, [status])

    const navigate = useNavigate();
    const navigateCallback = (url) => {
        window.location.href = url;
      };
    const handlePaymentVNPay = () => {
        dispatch(createPaymentByVNPAYAction(id,navigateCallback));
    }
    return (
        <div className='border p-4'>
            <div >
                <form className=' form-search'>
                    <div className="">
                        <div><h3><i>PaymentRequest</i></h3></div>
                        <label className="form-label">CustomePay:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Input CustomePay'
                            value={customePay}
                            onChange={(event) => setCustomePay(event.target.value)}
                        />
                    </div>


                    <div className="">
                        <label className="form-label">Status:</label>
                        <select class="form-select" onChange={(event) => setStatus(event.target.value)}>
                            <option value="" >----------------Choose--------------------</option>
                            <option value="QR">Payment By QR</option>
                            <option value="CASH">Payment By Carsh</option>
                        </select>
                    </div>
                </form>

                <Button className='btn btn-success' onClick={handleRequest}
                >
                    <i class="fas fa-cart-plus"></i>&nbsp;Create Payment</Button>
                <Button onClick={handlePaymentVNPay}>
                    <i class="fas fa-times-circle"></i>&nbsp;PaymentByVnPay</Button>
            </div>
            {setShowQR && (
                <ModalQR
                    show={showOR}
                    onHide={() => setShowQR(false)}
                />
            )}
        </div>
    )
}

export default ModalRequestPayment
