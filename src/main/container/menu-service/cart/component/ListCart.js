import React from 'react'
import { Table } from 'react-bootstrap'
import Cart from '../entity/Cart'
import { useState } from 'react'
import { findAllCart, findByUserCode, findByUserCodeV2 } from '../service/CartService'
import { useEffect } from 'react'
import { findAll, getAllBase64Image } from '../../menu/service/MenuService'
import { useSelector } from 'react-redux'
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector'
import '../component/ListCart.scss'
import { find } from 'lodash'
const ListCart = () => {
    const [listCart, setListCart] = useState([]);
    const [listId,setListId] = useState([]);
    const tokenRespone = useSelector(SelectTokenResponse);

    const getAllCartByUserCode = async () => {
        try{
            const userCode = tokenRespone.user.userCode;
            const res = await findByUserCodeV2(userCode);
            if(res && res.data.responseData) {
                setListCart(res.data.responseData[userCode]);
            }
        }catch(error){
            console.log(error);
        }
    }

    const loadData = () => {
        getAllCartByUserCode();
    }

    useEffect(() => {
        getAllCartByUserCode()
    }, [])

    const handleOrder = () => {
        console.log(listId);
    }

    const handleSendData = (data) => {
        if (data && data.length > 0) {
          setListId((prevListId) => [...prevListId, ...data]);
        }  if (data && data.length === 0) {
          setListId((prevListId) => [...prevListId, []]);
        }
      };
      

    return (
        <div>
            <div className='config-title'>Cart User <i>{tokenRespone.user.fullName}</i> </div>
            <div className='d-flex justify-content-end'>
                <button 
                className='btn btn-success mb-2 me-4'
                onClick={handleOrder}
                >
                    <i class="fa-solid fa-list"></i>&nbsp;Order</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>STT</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>InitPrice</th>
                        <th>CreateDate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listCart && listCart.map((item, index) => {
                        return (
                            <Cart
                                key={index}
                                stt={index+1}
                                id={item.id}
                                code={item.code}
                                nameResponse={item.response.name}
                                imgResponse={() => getAllBase64Image(item.response.id)}
                                price={item.price}
                                amount={item.amount}
                                initPrice={item.initPrice}
                                createDate={item.createDate}
                                loadData={loadData}
                                sendData={handleSendData}
                            />
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default ListCart
