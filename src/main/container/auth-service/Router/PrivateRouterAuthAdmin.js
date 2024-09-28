import React from 'react'
import { useSelector } from 'react-redux'
import { SelectAuth, SelectTokenResponse } from '../redux/AuthSelector'
import Alert from 'react-bootstrap/Alert';

const PrivateRouterAuthAdmin = (props) => {
    const isAuth = useSelector(SelectAuth);
    const tokenResponse = useSelector(SelectTokenResponse);
    if (tokenResponse.user.role !== "ADMIN" || isAuth !== true) {
        return <>
            <Alert variant="danger" className='mt-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                 Router this account admin connect
                </p>
            </Alert>
        </>
    }
    return (

        <div>
            {props.children}
        </div>
    )
}

export default PrivateRouterAuthAdmin
