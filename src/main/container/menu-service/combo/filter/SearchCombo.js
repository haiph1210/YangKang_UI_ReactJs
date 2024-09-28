import _, { debounce, set } from 'lodash';
import React, { useState } from 'react'
import '../filter/SearchCombo.scss'
import { findForm, findFormCombo } from '../service/ComboService';
import { toast } from 'react-toastify';
const FilterCombo = ({ listCombos, afterFilter, refresh }) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearchComboName = debounce((event) => {
        let value = event.target.value;
        if (value) {
            let cloneCombo = _.cloneDeep(listCombos);
            let filter = cloneCombo.filter(item => item.name.includes(value));
            afterFilter(filter);
        } else {
            afterFilter(listCombos)
        }
    }, 500);

    const handleRefresh = (e) => {
        e.preventDefault();
        // afterFilter(listCombos);
        setMinPrice("")
        setMaxPrice("")
        refresh()
    }

    const handleSearch = (e) => {
        e.preventDefault();
        afterSearch();
    }

    const afterSearch = async () => {
        const res = await findFormCombo(minPrice, maxPrice);
        console.log(res.responseData);
        if (res && res.responseData) {
            setMinPrice("");
            setMaxPrice("");
            toast.success(`Find by form from ${minPrice} to ${maxPrice} successfully`);
            afterFilter(res.responseData);
        } else {
            toast.error(` From ${minPrice} to ${maxPrice} cann't value `)
        }
    }

    return (
        <div>
            <form className='border form-search'>
                <div className='d-sm-flex justify-content-end  '>
                    <div className="mb-3 me-4">
                        <label className="form-label">Nhập Tên:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Tìm Kiếm Bằng Tên Combo'
                            onChange={(event) => handleSearchComboName(event)}
                        />
                    </div>
                    <div className="mb-3 me-4">
                        <label className="form-label">Từ Giá:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Tìm Kiếm Từ Giá'
                            value={minPrice}
                            onChange={(event) => setMinPrice(event.target.value)}
                        />
                    </div>
                    <div className='me-3 handle'><label className="form-label">--</label></div>
                    <div className="mb-3 me-4">
                        <label className="form-label">Đến Giá:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Tìm Kiếm Đến Giá'
                            value={maxPrice}
                            onChange={(event) => setMaxPrice(event.target.value)}
                        />
                    </div>
                    <div className="me-4 d-flex ">
                       <div className='ms-3'>
                        <button
                            id='btn-serch'
                            className='btn btn-light btn-search'
                            onClick={(e) => handleSearch(e)}
                        >
                            <i class="fas fa-search"></i>
                            &nbsp;
                            Search
                        </button>
                        </div>
                        <div className='ms-3'>
                        <button
                            id='btn-refresh'
                            className='btn btn-secondary btn-search'
                            onClick={(e) => handleRefresh(e)}
                        >
                            <i class="fas fa-sync-alt"></i>
                            &nbsp;
                            Refresh</button>
                    </div>
                    </div>

                    
                </div>
            </form>
        </div>
    )
}

export default FilterCombo
