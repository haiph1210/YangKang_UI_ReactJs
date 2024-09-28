import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findOrderById } from '../../order/service/OrderService';
import { selectOrderId } from '../../order/redux/OrderSelect';
import { findOrderByIdAction } from '../../order/redux/OrderAction';
import { NumberFormat } from 'intl';
import { format } from 'date-fns';

const OrderById = () => {
    const dispatch = useDispatch();
    
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
    // const formatCreatedDate = (createdDate) => {
    //     return format(new Date(createdDate), 'dd/MM/yyyy');
    // }

    // const formatHour = (hour) => {
    //     return format(new Date(hour), 'hh:mm:ss a');
    // }



    const order = useSelector(selectOrderId);
    const [newArr, setNewArr] = useState([]);
    const convertArr = (arr, err, property) => {
        if (arr === undefined) {
            return err;
        } else if (arr.length === 0) {
            return err;
        } else {
            const tempArr = arr.map((item) => item[property]);
            return tempArr;
        }
    };


    return (
        <div className='border p-4 mt-4'>
            <div><h3><i>Orders</i></h3></div>
            <div>
                <div>Code: {order.orderCode}</div>
                <div>Menu: {convertArr(order.menus, 'Menu No Order', 'name')}</div>
                <div>Combo: {convertArr(order.combos, 'Combo No Order', 'name')}</div>
                <div>Cart: {convertArr(order.carts, 'Carts No Order', 'code')}</div>
                <div>TotalAmount: {order.totalAmount}</div>
                <div>TotalPrice: {formatPrice(order.totalPrice)}</div>
                <div>Type: {order.type}</div>
                <div>Hour: {(order.hour)}</div>
                <div>CreateDate: {(order.createDate)}</div>

            </div>
        </div>
    )
}

export default OrderById
