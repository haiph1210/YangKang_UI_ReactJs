import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findAllOrderPageAction } from '../redux/OrderAction';
import { format } from 'date-fns';
import { selectOrder, selectTotalPageOrder } from '../redux/OrderSelect';
import Order from '../entity/Order';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
import { findAllOrderByUserCode } from '../service/OrderService';
import ModalCRUD from '../modal/ModalCRUD/ModalCRUD';
import { NumberFormat } from 'intl';

const ListOrder = () => {
    const tokenResponse = useSelector(SelectTokenResponse);

    const formatCreatedDate = (createdDate) => {
        return format(new Date(createdDate), 'dd/MM/yyyy');
    }

    const formatHour= (hour) => {
        return format(new Date(hour),'hh:mm:ss a');
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
    const selectOrders = useSelector(selectOrder);
    const selectPageOrder = useSelector(selectTotalPageOrder);

    const dispatch = useDispatch();

    const checkIsAdmin = (token) => {
        if(token.user.role === "ADMIN") {
            dispatch(findAllOrderPageAction(1));
        }else{
            // dispatch(findAllOrderByUserCode(token.user.userCode));
        }
    }
 
    useEffect(() => {
        checkIsAdmin(tokenResponse);
    }, [])


    const handlePageClick = (event) => {
        dispatch(findAllOrderPageAction(+event.selected+1));
    }



    return (
        <div className=''>
            <Container className='' >
                <ModalCRUD/>
                <Row xs={1} md={3} className="g-sm-4 border mt-3 ms-0 me-0 hanlde-1236 ">
                    {selectOrders && selectOrders.length > 0 && selectOrders.map((item, index) => (
                        <Col key={"order" + index} >
                            <Order
                                key={index}
                                id={item.id}
                                orderCode={item.orderCode}
                                personResponse={item.personResponses}
                                people={item.people}
                                totalAmount={item.totalAmount}
                                totalPrice={formatPrice(item.totalPrice)}
                                createdDate={formatCreatedDate(item.createDate)}
                                hour={formatHour(item.hour)}
                                description={item.description}
                                type={item.type}
                                status={item.status}
                                form={item.forms}
                                // load={handleDataRes}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <ReactPaginate
                className='d-flex justify-content-center mt-3 list-unstyled'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={selectPageOrder}
                previousLabel="< previous"

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />


        </div>
    )
}

export default ListOrder
