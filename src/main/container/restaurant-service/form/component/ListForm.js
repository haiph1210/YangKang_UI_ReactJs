import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllFormAction, findAllPageFormAction } from '../redux/FormAction';
import { findAllFormSelector, findTotalPagesSelector } from '../redux/selector/FormSelector';
import { Col, Container, Row } from 'react-bootstrap';
import Form from '../entity/Form';
import Pagination from '../../../../config/page/Pagination';
import './ListForm.scss'
const ListForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findAllPageFormAction());
        dispatch(findAllFormAction());
    }, [dispatch]);

    const formList = useSelector(findAllFormSelector);

    const totalPages = useSelector(findTotalPagesSelector);
    const handlePageClick = (event) => {
        dispatch(findAllPageFormAction(+event.selected + 1));
    }
    return (
        <div >
            <Container>
                <div className='config-title'>List Form</div>
                <Row xs={1} md={3} className="g-sm-4 border">
                    {formList &&
                        formList.length > 0 &&
                        formList.map((item, index) => (
                            <Col className='handle-config' key={index}>
                                <Form
                                    id={item.id}
                                    formCode={item.formCode}
                                    status={item.status}
                                />
                            </Col>
                        ))}
                </Row>
            </Container>
            <Pagination
                pageCount={totalPages}
                handlePageClick={handlePageClick}
            ></Pagination>
        </div>
    )
}

export default ListForm
