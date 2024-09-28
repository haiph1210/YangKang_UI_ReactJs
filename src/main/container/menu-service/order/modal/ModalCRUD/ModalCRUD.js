import React, { useState } from 'react'
import CustomeInput from '../../../../../input/CustomeInput'
import { styled } from '@material-ui/core';
import './ModalCRUD.scss'
import ModalRequestOrder from '../ModalRequest';
import { set } from 'lodash';
const ModalCRUD = () => {
    const [findOrderCode, setFindOrderCode] = useState('');
    const [openModalCreate,setOpentModalCreate] = useState(false);

    const handleSearch = () => {
        
    }
    const handleCreate = () => {
        setOpentModalCreate(true);

    }
    return (
        <div className='border p-4'>
            <div className='d-flex justify-content-between'>
               
                <div className='d-flex '>
                    <div className='config-input'>
                    <input
                        type='text'
                        value={findOrderCode}
                        placeholder='FindByOrderCode'
                        onChange={(event) => setFindOrderCode(event.target.value)}
                    />
                    </div>
                    <button
                    className='btn btn-dark'
                    onClick={handleSearch}
                    ><i class="fa-solid fa-magnifying-glass"></i>&nbsp;Search</button>
                </div>
                <button 
                className='btn btn-warning'
                onClick={handleCreate}> <i class="fa-solid fa-plus"></i>&nbsp;Create Order</button>
            </div>
            {openModalCreate && (
                <ModalRequestOrder
                show={openModalCreate}
                onHide={() => setOpentModalCreate(false)}
                
                />
                    
               
            )}
        </div>
    )
}

export default ModalCRUD
