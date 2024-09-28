import _, { debounce, set } from 'lodash';
import React, { useState } from 'react'
import '../filter/SearchMenu.scss'
import { findForm } from '../service/MenuService';
import { toast } from 'react-toastify';
const FilterMenu = ({ listMenus, afterFilter, refresh }) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearchMenuName = debounce((event) => {
        let value = event.target.value;

        if (value) {
            let cloneMenu = _.cloneDeep(listMenus);
            let filter = cloneMenu.filter(item => item.name.includes(value));
            afterFilter(filter);
        } else {
            afterFilter(listMenus)
        }
    }, 500);

    const handleRefresh = (e) => {
        e.preventDefault();
        afterFilter(listMenus);
        setMinPrice("")
        setMaxPrice("")
        refresh()
    }

    const handleSearch = (e) => {
        e.preventDefault();
        afterSearch();
    }

    const afterSearch = async () => {
        const res = await findForm(minPrice, maxPrice);
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
                            placeholder='Tìm Kiếm Bằng Tên Menu'
                            onChange={(event) => handleSearchMenuName(event)}
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

export default FilterMenu
