import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { findByUserCode } from '../../service/UserService';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const UserInfo = () => {
    var FIND_URL = 'http://localhost:8001/api/user/file?fileName='
    const [userRes, setUserRes] = useState([]);
    const [activeTab, setActiveTab] = useState('intro');
    const [activeTabChildren, setActiveTabChildren] = useState('overview');
    const userCode = useParams();
    const getByUserCode = async () => {
        const res = await findByUserCode(userCode.id);
        if (res && res.data.responseData) {
            setUserRes(res.data.responseData);
        }
    }


    const handleTabChange = (eventKey) => {
        setActiveTab(eventKey);
    }

    const handleTabChangeChildren = (eventKey) => {
        setActiveTabChildren(eventKey);
    }

    useEffect(() => {
        getByUserCode()
    }, [])
    return (
        <div>
            <div class="d-flex bd-highlight border-bottom">
                <div class="p-2 flex-shrink-1 bd-highlight">
                    <img
                        src={FIND_URL + userRes.imgUrl}
                        width={"80px"}
                        height={"80px"}
                        className='rounded-circle'
                        alt={userRes.fullName}
                    />
                </div>
                <div class="p-2 w-100 bd-highlight">{userRes.fullName}</div>

            </div>
            <div>
                <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange} className='mt-2 mb-2'>
                    <Nav.Item>
                        <Nav.Link eventKey="intro">Intro</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="image">Imgae</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            {activeTab === 'intro' && (
                <div className='d-sm-flex '>
                    <div className='p-2 flex-shrink-1 bd-highlight border'>
                        <h6>Intro</h6>
                        <Nav variant="tabs" activeKey={activeTabChildren} onSelect={handleTabChangeChildren} className='flex-sm-column me-4'>
                            <Nav.Item>
                                <Nav.Link eventKey="overview">Overview</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="lived">Where Once Lived</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="contact-us">Contact Info</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    {activeTabChildren === 'overview' && (
                        <div className='border p-2 w-100 bd-highlight'>
                            Oke
                            </div>
                    )   }
                </div>
            )}
            {activeTab === 'image' && (
                <div>
                    Bánh
                </div>
            )}
        </div>
    )
}

export default UserInfo