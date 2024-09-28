import React, { useEffect } from 'react';
import User from '../entity/User';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { findAllAction } from '../redux/UserAction';

const ListUser = () => {
    var FIND_URL = 'http://localhost:8001/api/user/file?fileName='
    const dispatch = useDispatch();
    const listUser = useSelector((state) => state.user.userList);

    useEffect(() => {
        dispatch(findAllAction());
    }, [dispatch]);

    return (
        <div>
            <Container>
                <Row xs={1} md={3} className="g-sm-4 border">
                    {listUser && listUser.length > 0 && listUser.map((user, index) => (
                        <Col key={index}>
                            <User
                                id={user.id}
                                username={user.username}
                                userCode={user.userCode}
                                fullName={user.fullName}
                                email={user.email}
                                address={user.address}
                                birthDay={user.birthDay}
                                gender={user.gender}
                                status={user.status}
                                role={user.role}
                                createdDate={user.createdDate}
                                imgUrl={FIND_URL + user.imgUrl}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ListUser;
