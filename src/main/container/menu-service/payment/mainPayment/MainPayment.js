import React, { useEffect, useState } from 'react'
import ModalRequestPayment from '../modal/ModalRequestPayment'
import UserInfo from './UserInfo'
import OrderById from './OrderById'
import { useParams } from 'react-router-dom'
import { findOrderByIdAction } from '../../order/redux/OrderAction'
import { useDispatch } from 'react-redux'

const MainPayment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    

    const [ids,setIds] = useState('');
    useEffect(() => {
        setIds(id);
    },[])

    useEffect(() => {
        if(id !== undefined) {
            dispatch(findOrderByIdAction(id));
        }
    }, [id])

    return (
        <div className='d-flex flex-column border p-4'>
            <div className='d-flex justify-content-center'><i><h1>Payment</h1></i></div>
            <div className='d-flex justify-content-around'>
                <div><ModalRequestPayment
                id={ids}
                /></div>
                <div>
                    <div><UserInfo /></div>
                    
                    <div>
                        <OrderById
                            id={ids} />
                            </div>
                </div>
            </div>

        </div>
    )
}

export default MainPayment
