import React from 'react'
import { useSelector } from 'react-redux'
import { SelectAuth, SelectTokenResponse } from '../redux/AuthSelector'
import Alert from 'react-bootstrap/Alert';

const PrivateRouterAuth = (props) => {
    const isAuth = useSelector(SelectAuth);
    const tokenResponse = useSelector(SelectTokenResponse);
    if (tokenResponse && isAuth !== true) {
        return <>
            <Alert variant="danger" className='mt-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have permission to access this router
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

export default PrivateRouterAuth
