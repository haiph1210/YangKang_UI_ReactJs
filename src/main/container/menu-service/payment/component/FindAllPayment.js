import React, { useEffect } from 'react'
import ListPayment from './ListPayment';
import { useDispatch } from 'react-redux';
import { findAllPagePaymentAction } from '../redux/PaymentAction';

const FindAllPayment = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAllPagePaymentAction(1));
    }, []);
  return (
    <div>
        <ListPayment></ListPayment>
    </div>
  )
}

export default FindAllPayment
