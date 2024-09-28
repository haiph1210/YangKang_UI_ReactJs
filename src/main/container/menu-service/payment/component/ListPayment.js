import React, { useEffect } from 'react';
import Payments from '../entity/Payment';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { findAllPagePaymentAction } from '../redux/PaymentAction';
import { selectPayments, selectTotalPages } from '../redux/PaymentSelector';
import Pagination from '../../../../config/page/Pagination';
import { NumberFormat } from 'intl';
import { format } from 'date-fns';

const ListPayment = () => {
    const dispatch = useDispatch()
    const selectPayment = useSelector(selectPayments);
    const selectTotalPage = useSelector(selectTotalPages);
    console.log(selectPayment);
    const handlePageClick = (event) => {
        dispatch(findAllPagePaymentAction(+event.selected + 1));
    }

    const formatPrice = (price) => {
        const formatter = new NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(price);
    };
    const formatPriceUSD = (priceVND) => {
        const exchangeRate = 23000; // Tỷ giá hối đoái: 23.000 VND = 1 USD
        const priceUSD = priceVND / exchangeRate;
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(priceUSD);
    };
    const formatCreatedDate = (createdDate) => {
        return format(new Date(createdDate), 'dd/MM/yyyy');
    }

    const formatHour = (hour) => {
        return format(new Date(hour), 'hh:mm:ss a');
    }



    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>PaymentCode</th>
                        <th>OrderCode</th>
                        <th>DiscountCode</th>
                        <th>%</th>
                        <th>IsEXPIRED</th>
                        <th>TotalPrice</th>
                        <th>CustomePay</th>
                        <th>Remain</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>CreateDate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {selectPayment &&
                            selectPayment.length > 0 &&
                            selectPayment.map((item, index) => (
                                <Payments
                                    key={index}
                                    id={item.id}
                                    index={index + 1}
                                    paymentCode={item.paymentCode}
                                    orderResponse={item.orderResponse}
                                    discountResponse={item.discountResponse}
                                    totalPrice={formatPrice(item.totalPrice)}
                                    customerPay={formatPrice(item.customerPay)}
                                    remain={formatPrice(item.remain)}
                                    status={item.status}
                                    score={formatPrice(item.score)}
                                    createDate={formatCreatedDate(item.createDate)}
                                />
                            ))}
                    </tr>
                </tbody>
            </Table>
            <Pagination
                pageCount={selectTotalPage}
                handlePageClick={handlePageClick}
            ></Pagination>
        </div>
    )
}

export default ListPayment
