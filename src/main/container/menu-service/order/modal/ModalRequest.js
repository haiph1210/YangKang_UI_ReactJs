import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import CustomCheckbox from '../../../../input/CustomCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { findAllFormSelector } from '../../../restaurant-service/form/redux/selector/FormSelector';
import { findAllAction } from '../../../user-service/user/redux/UserAction';
import { findAllFormAction } from '../../../restaurant-service/form/redux/FormAction';
import { findAll, findAllListMenu } from '../../menu/service/MenuService';
import { findAllListCombo, findAllListCombo2 } from '../../combo/service/ComboService';
import { SelectTokenResponse } from '../../../auth-service/redux/AuthSelector';
import { findByUserCodeV2 } from '../../cart/service/CartService';
import { createOrderAction } from '../redux/OrderAction';

const ModalRequestOrder = ({ show, onHide, isSuccess, isMenu, isCombo, isCart }) => {
    const [findAllMenu, setFindAllMenu] = useState([]);
    const [findAllCombo, setFindAllCombo] = useState([]);
    const [findAllCart, setFindAllCart] = useState([]);

    const getAllMenus = async () => {
        const res = await findAllListMenu();
        if (res && res.responseData && res.responseData) {
            setFindAllMenu(res.responseData);
        }
    };

    const getAllCombo = async () => {
        const res = await findAllListCombo2();
        if (res && res.responseData && res.responseData) {
            setFindAllCombo(res.responseData);
        }
    };


    const tokenRespone = useSelector(SelectTokenResponse);

    const getAllCartByUserCode = async () => {
        try {
            const userCode = tokenRespone.user.userCode;
            const res = await findByUserCodeV2(userCode);
            if (res && res.data.responseData) {
                setFindAllCart(res.data.responseData[userCode]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllMenus();
    }, [])

    useEffect(() => {
        getAllCombo();
    }, [])

    useEffect(() => {
        getAllCartByUserCode();
    }, [])
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(show);
    const [menus, setMenus] = useState([]);
    const [combos, setCombos] = useState([]);
    const [carts, setCarts] = useState([]);

    const [people, setPeople] = useState('-------------------Chose-----------------');
    const [hour, setHour] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState("RESTAURANT");
    const [forms, setForms] = useState([]);
    useEffect(() => {
        dispatch(findAllFormAction())
    }, [])

    useEffect(() => {

    }, [isMenu])
    const listForms = useSelector(findAllFormSelector);
    const [checkedItems, setCheckedItems] = useState([]);
    const hideModal = () => {
        setShowModal(!show);
    }
    const comeBackShow = () => {
        setShowModal(show);
    }

    const handleMenus = (event) => {
        const selectedId = parseInt(event.target.value);
        const checked = event.target.checked;

        setMenus((prevItems) => {
            if (checked) {
                return [...prevItems, selectedId];
            } else {
                return prevItems.filter((id) => id !== selectedId);
            }
        });
    }
    const handleCombos = (event) => {
        const selectedId = parseInt(event.target.value);
        const checked = event.target.checked;

        setCombos((prevItems) => {
            if (checked) {
                return [...prevItems, selectedId];
            } else {
                return prevItems.filter((id) => id !== selectedId);
            }
        });
    }
    const handleCarts = (event) => {
        const selectedId = parseInt(event.target.value);
        const checked = event.target.checked;

        setCarts((prevItems) => {
            if (checked) {
                return [...prevItems, selectedId];
            } else {
                return prevItems.filter((id) => id !== selectedId);
            }
        });
    }

    const handleForms = (event) => {
        const selectedId = parseInt(event.target.value);
        const checked = event.target.checked;

        setForms((prevItems) => {
            if (checked) {
                return [...prevItems, selectedId];
            } else {
                return prevItems.filter((id) => id !== selectedId);
            }
        });
    };

    const handleRequest = () => {
        const userCode= tokenRespone.user.userCode;
        dispatch(createOrderAction(userCode,menus,combos,carts,forms,people,hour,description,type,onHide));
    }
    return (
        <div>
            <div>
                <Modal show={showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton={onHide}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create New Order
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <form className='border form-search'>
                            <div id='menu-id' className='d-flex flex-column mt-3'>
                                <Container>
                                    <label className="config">ListMenu:</label>
                                    <Row xs={1} md={5} className="g-sm-4 border">
                                        {findAllMenu && findAllMenu.length > 0 && findAllMenu.map((item, index) => (
                                            <Col className='handle-config' key={index}>
                                                <label className={`d-flex justify-content-center checkbox-button ${menus.includes(item.id) ? 'checked' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        className='me-2'
                                                        onChange={handleMenus}
                                                    />
                                                    {item.code}
                                                </label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </div>
                            <div id='combo-id' className='d-flex flex-column mt-3'>
                                <Container>
                                    <label className="config">ListCombo:</label>
                                    <Row xs={1} md={5} className="g-sm-4 border">
                                        {findAllCombo && findAllCombo.length > 0 && findAllCombo.map((item, index) => (
                                            <Col className='handle-config' key={index}>
                                                <label className={`d-flex justify-content-center checkbox-button ${combos.includes(item.id) ? 'checked' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        className='me-2'
                                                        onChange={handleCombos}
                                                    />
                                                    {item.code}
                                                </label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </div>
                            <div id='cart-id' className='d-flex flex-column mt-3'>
                                <Container>
                                    <label className="config">ListCart:</label>
                                    <Row xs={1} md={5} className="g-sm-4 border">
                                        {findAllCart && findAllCart.length > 0 && findAllCart.map((item, index) => (
                                            <Col className='handle-config' key={index}>
                                                <label className={`d-flex justify-content-center checkbox-button ${carts.includes(item.id) ? 'checked' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        className='me-2'
                                                        onChange={handleCarts}
                                                    />
                                                    {item.code}
                                                </label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </div>
                            <div id='form-id' className='d-flex flex-column mt-3'>
                                <Container>
                                    <label className="config">ListForm:</label>
                                    <Row xs={1} md={5} className="g-sm-4 border">
                                        {listForms && listForms.length > 0 && listForms.map((item, index) => (
                                            <Col className='handle-config' key={index}>
                                                <label className={`d-flex justify-content-center checkbox-button ${forms.includes(item.id) ? 'checked' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        className='me-2'
                                                        onChange={handleForms}
                                                    />
                                                    {item.formCode}
                                                </label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </div>
                            <div className="">
                                <label className="form-label">People:</label>
                                <select class="form-select" onChange={(event) => setPeople(event.target.value)}>
                                    <option value="" >----------------Choose--------------------</option>
                                    <option value="TEN">1-10 People</option>
                                    <option value="FIVETEEN">10-15 People</option>
                                    <option value="TWENTY">15-20 People</option>
                                    <option value="THIRTY">20-30 People</option>
                                    <option value="FIVETY">30-50 People</option>
                                    <option value="ONE">Book A Party</option>
                                </select>
                            </div>

                            <div className="">
                                <label className="form-label">Hour:</label>
                                <input
                                    type="datetime-local"
                                    id="hour"
                                    name="hour"
                                    className="form-control"
                                    value={hour}
                                    onChange={(event) => setHour(event.target.value)}
                                />
                            </div>
                            <div className="">
                                <label className="form-label">Description:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Input Description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                            <div className="">
                                <label className="form-label">Type:</label>
                                <select class="form-select" onChange={(event) => setType(event.target.value)}>
                                    <option value="" >----------------Choose--------------------</option>
                                    <option value="RESTAURANT">Restaurant</option>
                                    <option value="TAKE_HOME">Take Home</option>
                                </select>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button className='btn btn-success' onClick={handleRequest}
                        >
                            <i class="fas fa-cart-plus"></i>&nbsp;Send</Button>
                        <Button onClick={onHide}>
                            <i class="fas fa-times-circle"></i>&nbsp;Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}

export default ModalRequestOrder
