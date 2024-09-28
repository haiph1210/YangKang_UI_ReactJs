import React, { useEffect, useState } from 'react'
import { createCombo, updateCombo } from '../service/ComboService';
import _, { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { findAllListMenu } from '../../menu/service/MenuService';
import { Col, Row } from 'react-bootstrap';

const ModalRequest = ({ afterAdd, comboData, resfresh, setRefresh }) => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [fileImage, setFileImage] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [menus, setMenus] = useState([]);
    const [menuIds, setMenuIds] = useState([]);
    const handleRequest = (event) => {
        event.preventDefault();
        const value = event.target.files;
        const values = Array.from(value);
        setFileImage(event.target.files);
        const fileNames = values.map((file) => file.name);
        setFileName(fileNames);
    };



    const findAllMenu = async () => {
        const res = await findAllListMenu();
        if (res && res.responseData) {
            setMenus(res.responseData);
        }
    }

    useEffect(() => {
        findAllMenu();
    }, [])

    const handleMenuIds = (event) => {
        const selectedId = parseInt(event.target.value);
        if (event.target.checked) {
            setMenuIds((prevMenuIds) => [...prevMenuIds, selectedId]);
        } else {
            setMenuIds((prevMenuIds) => prevMenuIds.filter((id) => id !== selectedId));
        }
    }

console.log(menuIds);
    const handleSave = async (event) => {
        const idMenus = document.getElementById('checked-idMenu');
        event.preventDefault();
        if (id === null) {
            const res = await createCombo(name, description, fileImage, menuIds);
            if (res && res.responseData) {
                setName("");
                setDescription("");
                setFileImage("");
                setFileName("")
                setMenuIds("")
                const checkboxes = idMenus.querySelectorAll('input[type="checkbox"]');
                Array.from(checkboxes).forEach((checkbox) => {
                    const menuId = parseInt(checkbox.value);
                    if (menuIds.includes(menuId)) {
                        checkbox.checked = false;
                    }
                });
                afterAdd();
                toast.success(`Create new combo: ${name} successfully`);
            } else {
                toast.error(`Create new combo: ${name} false`);
            }
        } else {
            const res = await updateCombo(id, name, description, fileImage,menuIds);
            if (res && res.responseData) {
                setId("");
                setName("");
                setDescription("");
                setFileImage("");
                setFileName("")
                setMenuIds("")
                const checkboxes = idMenus.querySelectorAll('input[type="checkbox"]');
                Array.from(checkboxes).forEach((checkbox) => {
                    const menuId = parseInt(checkbox.value);
                    if (menuIds.includes(menuId)) {
                        checkbox.checked = false;
                    }
                });
                afterAdd();
                toast.success(`Update combo: ${name} successfully`);
                comboData.updateSucess();
            } else {
                toast.error(`Update combo: ${name} false`);
            }
        }
    }


    useEffect(() => {
        const id = document.getElementById('id');
        if (comboData && comboData.isUpdate === true) {
          id.style.display = 'block';
          setId(comboData.id);
          setName(comboData.name);
          setDescription(comboData.description);
          setFileImage(comboData.imgUrl);
          const tempMenuIds = [...comboData.menuId];
          setMenuIds(tempMenuIds);
          checkBoxIfMenuIdExist(tempMenuIds);
        } else {
          id.style.display = 'none';
        }
      }, [comboData]);
      
      const checkBoxIfMenuIdExist = (tempMenuIds) => {
        const idMenus = document.getElementById('checked-idMenu');
        const checkboxes = idMenus.querySelectorAll('input[type="checkbox"]');
        Array.from(checkboxes).forEach((checkbox) => {
          const menuId = parseInt(checkbox.value);
          if (tempMenuIds.includes(menuId)) {
            checkbox.checked = true;
          }
        });
      }
      

    useEffect(() => {
        const id = document.getElementById('id');
        if (resfresh === true) {
            id.style.display = 'none';
            setId("");
            setName("");
            setDescription("");
            setFileImage("");
            setMenuIds("")
            setRefresh();
        } else {
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
                            placeholder='Nhập vào tên combo'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
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
                <div className="mb-3 me-4">
                    <div className="mb-3 me-4 d-flex flex-column justify-content-center">
                        <div>
                            <label className="form-label d-flex justify-content-center">Menu:</label>
                            <div id='checked-idMenu'>
                                <Row>
                                    {menus &&
                                        menus.length > 0 &&
                                        menus.map((item, index) => (
                                            <Col key={index} xs={12} sm={6} md={4}>
                                                <label className='d-flex justify-content-center'>
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        className='me-2'
                                                        onChange={handleMenuIds}
                                                    />
                                                    {item.name}
                                                </label>
                                            </Col>
                                        ))}
                                </Row>
                            </div>
                        </div>
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
            </form >
        </div >
    )
}

export default ModalRequest
