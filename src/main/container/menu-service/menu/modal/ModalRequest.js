import React, { useEffect, useState } from 'react'
import { createMenu, updateMenu } from '../service/MenuService';
import _, { debounce } from 'lodash';
import { toast } from 'react-toastify';

const ModalRequest = ({ afterAdd, menuData, resfresh, setRefresh }) => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [fileImage, setFileImage] = useState([]);
    const [fileName, setFileName] = useState([]);
    const handleRequest = (event) => {
        event.preventDefault();
        const value = event.target.files;
        const values = Array.from(value);
        setFileImage(event.target.files);
        const fileNames = values.map((file) => file.name);
        setFileName(fileNames);
    };
    



    const handleSave = async (event) => {
        event.preventDefault();
        if (id === null) {
            const res = await createMenu(name, price, description, fileImage);
            if (res && res.responseData) {
                setName("");
                setPrice("");
                setDescription("");
                setFileImage("");
                setFileName("")
                afterAdd();
                toast.success(`Create new menu: ${name} successfully`);
            } else {
                toast.error(`Create new menu: ${name} false`);
            }
        } else {
            const res = await updateMenu(id, name, price, description, fileImage);
            if (res && res.responseData) {
                setId("");
                setName("");
                setPrice("");
                setDescription("");
                setFileImage("");
                setFileName("")
                afterAdd();
                toast.success(`Update menu: ${name} successfully`);
            } else {
                toast.error(`Update menu: ${name} false`);
            }
        }
    }
    useEffect(() => {
        const id = document.getElementById('id');
        console.log(id);
        if (menuData && menuData.isUpdate === true) {
            id.style.display = 'block';
            setId(menuData.id);
            setName(menuData.name);
            setPrice(menuData.price);
            setDescription(menuData.description);
            setFileImage(menuData.imgUrl);
        }else{
            id.style.display = 'none';
        }
    }, [menuData]);

    useEffect(() => {
        const id = document.getElementById('id');
        console.log(resfresh);
        if (resfresh ===true) {
            id.style.display = 'none';
            setId("");
            setName("");
            setPrice("");
            setDescription("");
            setFileImage("");
            setRefresh();
        }else{
        }
    }, [resfresh]);

    return (
        <div className='border mt-2'>

            <form className=' mt-2 d-flex flex-column'>
                <div className="mb-3 me-4 d-flex justify-content-center ">
                    <div id='id'>
                        <label className="form-label">
                            Id:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Nhập vào Id'
                            value={id}
                            disabled={true}
                            onChange={(event) => setId(event.target.value)}
                        />
                    </div>

                </div>

                <div className="mb-3 me-4 d-flex justify-content-center ">
                    <div>
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Nhập vào tên Menu'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="mb-3 ms-4">
                        <label className="form-label">Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Nhập vào giá trị'
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </div>

                    <div className="mb-3 ms-4">
                        <label className="form-label">Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Nhập vào mô tả sản phẩm'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />

                    </div>
                </div>

                <div className="mb-3 me-4 d-flex justify-content-center ">
                    <div className=''>
                        <label htmlFor="import-file" className='btn btn-warning'>
                            <i className='fa-solid fa-file-import'></i>
                            &nbsp;Import</label>
                        <input id="import-file" multiple type='file' hidden
                            onChange={(event) => handleRequest(event)}
                        />

                    </div>
                    <div className="ms-4">
                        <button
                            id='btn-add'
                            className='btn btn-success'
                            onClick={(event) => handleSave(event)}>
                            <i class="fas fa-paper-plane"></i>
                            &nbsp;SendRequest</button>
                    </div>
                </div>
                <div className='m-4'>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        {fileName &&
                            fileName.length > 0 &&
                            fileName.map((item, index) => (
                                <option className='' key={index} defaultValue={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                </div>
            </form>
        </div>
    )
}

export default ModalRequest
